import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Helper function to read/write JSON files safely
// On Vercel, use /tmp (writable). Locally, use root data/ folder.
const DATA_DIR = process.env.VERCEL 
  ? '/tmp' 
  : path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (filename: string) => path.join(DATA_DIR, filename);

const readJSONFile = <T>(filename: string, defaultData: T): T => {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Failed to read/parse ${filename}:`, err);
    return defaultData;
  }
};

const writeJSONFile = <T>(filename: string, data: T): boolean => {
  try {
    const filePath = getFilePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Failed to write to ${filename}:`, err);
    return false;
  }
};

// Seed initial reviews if file is empty or missing
const initialReviews = [
  {
    id: 'rev-1',
    productId: 'botanical-sleep-elixir',
    name: 'Aurelia V.',
    rating: 5,
    comment: 'This sleep elixir has completely changed my evening routine. Within 20 minutes of taking it, I feel a natural wave of calm wash over me. No grogginess at all the next day.',
    date: 'June 18, 2026'
  },
  {
    id: 'rev-2',
    productId: 'botanical-sleep-elixir',
    name: 'Harrison K.',
    rating: 5,
    comment: 'As a chronic light sleeper, I was skeptical of adaptogenic blends. But the addition of valerenic acid and magnesium bisglycinate in this tincture actually elongates my deep sleep cycle. Tested via my sleep tracker—delta waves are up 30%!',
    date: 'June 10, 2026'
  },
  {
    id: 'rev-3',
    productId: 'cellular-renewal-serum',
    name: 'Clara S.',
    rating: 5,
    comment: 'Absolutely gorgeous texture. It spreads beautifully and locks in moisture without feeling heavy. I was previously using synthetic retinol which irritated my skin, but this plant-based bakuchiol blend has given me zero redness and all the glow.',
    date: 'June 22, 2026'
  },
  {
    id: 'rev-4',
    productId: 'cortisol-balance-caps',
    name: 'Marcus E.',
    rating: 4,
    comment: 'Helps buffer my stress levels during busy clinic hours. The L-Theanine addition keeps my focus sharp without any caffeine jitters. Highly recommend.',
    date: 'May 14, 2026'
  }
];

// Seed reviews database on server start
readJSONFile('reviews.json', initialReviews);
// Initialize other databases
readJSONFile('subscribers.json', [] as string[]);
readJSONFile('orders.json', [] as any[]);
readJSONFile('contacts.json', [] as any[]);

// API Endpoints

// 1. Newsletter Subscription
app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  const subscribers = readJSONFile<string[]>('subscribers.json', []);
  const lowercaseEmail = email.toLowerCase().trim();

  if (subscribers.includes(lowercaseEmail)) {
    return res.status(400).json({ success: false, message: 'This email is already subscribed.' });
  }

  subscribers.push(lowercaseEmail);
  writeJSONFile('subscribers.json', subscribers);

  return res.status(200).json({
    success: true,
    message: 'Subscription successful. Your discount code has been dispatched.',
    discountCode: 'WELCOME15'
  });
});

// 2. Checkout & Order Processing
app.post('/api/checkout', (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phone,
    country,
    cartItems,
    total,
    shippingMethod,
    payment
  } = req.body;

  // Server-side validation
  if (!email || !firstName || !lastName || !address || !city || !zip || !phone) {
    return res.status(400).json({ success: false, message: 'Missing required shipping information.' });
  }

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: 'Your shopping cart is empty.' });
  }

  if (!payment || !payment.cardNumber || !payment.cardName || !payment.cardExpiry || !payment.cardCVV) {
    return res.status(400).json({ success: false, message: 'Missing payment details.' });
  }

  // Card validation tests
  const cleanedCard = payment.cardNumber.replace(/\s+/g, '');
  if (cleanedCard.length < 13 || cleanedCard.length > 19) {
    return res.status(400).json({ success: false, message: 'Invalid credit card number length.' });
  }

  if (payment.cardCVV.length < 3 || payment.cardCVV.length > 4) {
    return res.status(400).json({ success: false, message: 'Invalid security code (CVV).' });
  }

  // Simple Expiry format validation: MM/YY
  if (!/^\d{2}\/\d{2}$/.test(payment.cardExpiry)) {
    return res.status(400).json({ success: false, message: 'Expiration date must be in MM/YY format.' });
  }

  const generatedOrderId = `VERD-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDetails = {
    orderId: generatedOrderId,
    timestamp: new Date().toISOString(),
    customer: {
      email,
      name: `${firstName} ${lastName}`,
      phone
    },
    shipping: {
      address,
      city,
      state,
      zip,
      country,
      method: shippingMethod,
    },
    items: cartItems.map((item: any) => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      duration: item.selectedDuration,
      price: item.selectedDuration === '60 Days' 
        ? item.product.price * 2 * 0.85 
        : item.product.price
    })),
    total
  };

  const orders = readJSONFile<any[]>('orders.json', []);
  orders.push(orderDetails);
  writeJSONFile('orders.json', orders);

  // If newsletter checkbox was checked, add to subscribers
  if (req.body.newsletter) {
    const subscribers = readJSONFile<string[]>('subscribers.json', []);
    const lowercaseEmail = email.toLowerCase().trim();
    if (!subscribers.includes(lowercaseEmail)) {
      subscribers.push(lowercaseEmail);
      writeJSONFile('subscribers.json', subscribers);
    }
  }

  return res.status(200).json({
    success: true,
    orderId: generatedOrderId,
    message: 'Order processed successfully.',
    order: orderDetails
  });
});

// 3. Contact Us Submissions
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all fields in the contact form.' });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  const contactSubmission = {
    id: `MSG-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString(),
    name,
    email,
    subject,
    message
  };

  const contacts = readJSONFile<any[]>('contacts.json', []);
  contacts.push(contactSubmission);
  writeJSONFile('contacts.json', contacts);

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out. A botanical laboratory specialist will respond shortly.'
  });
});

// 4. Product Reviews GET
app.get('/api/reviews', (req: Request, res: Response) => {
  const { productId } = req.query;
  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ success: false, message: 'Product ID parameter is required.' });
  }

  const reviews = readJSONFile<any[]>('reviews.json', initialReviews);
  const filtered = reviews.filter((r) => r.productId === productId);

  // Sort reviews: newest first
  filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return res.status(200).json(filtered);
});

// 5. Product Reviews POST
app.post('/api/reviews', (req: Request, res: Response) => {
  const { productId, name, rating, comment } = req.body;

  if (!productId || !name || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'Missing required review fields.' });
  }

  const numericRating = Number(rating);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be an integer between 1 and 5.' });
  }

  const newReview = {
    id: `rev-${Math.floor(100000 + Math.random() * 900000)}`,
    productId,
    name,
    rating: numericRating,
    comment,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  const reviews = readJSONFile<any[]>('reviews.json', initialReviews);
  reviews.push(newReview);
  writeJSONFile('reviews.json', reviews);

  return res.status(200).json({
    success: true,
    message: 'Review posted successfully.',
    review: newReview
  });
});

// Production fallback: Serve static build (only utilized when running standalone locally in production)
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server locally if run directly and not in Vercel environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}

export default app;
