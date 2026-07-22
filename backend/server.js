const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const orders = [];

const products = [
  {
    id: 1,
    name: "Red Geometric Ikat Saree",
    category: "sarees",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop",
    description: "Handwoven traditional Pochampally Ikat saree with intricate geometric patterns in rich red.",
    material: "Pure Cotton",
    occasion: "Wedding, Festival, Casual",
    featured: true,
    color: "Red"
  },
  {
    id: 2,
    name: "Blue Indigo Double Ikat Saree",
    category: "sarees",
    price: 3999,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1676995304395-4302878b7258?w=900&q=80&auto=format&fit=crop",
    description: "Stunning double Ikat saree in deep indigo blue with mesmerizing diamond motifs.",
    material: "Pure Silk",
    occasion: "Wedding, Reception",
    featured: true,
    color: "Blue"
  },
  {
    id: 3,
    name: "Green Floral Ikat Saree",
    category: "sarees",
    price: 2899,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1756483492198-8ca91227489b?w=900&q=80&auto=format&fit=crop",
    description: "Elegant green Ikat saree with floral motifs. Soft pastel tones for daytime events.",
    material: "Cotton Silk",
    occasion: "Festival, Casual",
    featured: true,
    color: "Green"
  },
  {
    id: 4,
    name: "Golden Yellow Ikat Saree",
    category: "sarees",
    price: 3299,
    originalPrice: 4599,
    image: "https://images.unsplash.com/photo-1771929837105-122c2aab8a04?w=900&q=80&auto=format&fit=crop",
    description: "Radiant golden yellow Ikat saree with traditional temple border.",
    material: "Pure Cotton",
    occasion: "Wedding, Festival",
    featured: false,
    color: "Yellow"
  },
  {
    id: 5,
    name: "Purple Abstract Ikat Saree",
    category: "sarees",
    price: 2799,
    originalPrice: 3799,
    image: "https://images.unsplash.com/photo-1743015346855-a2014c6e8930?w=900&q=80&auto=format&fit=crop",
    description: "Contemporary purple Ikat saree with abstract wave patterns.",
    material: "Cotton Blend",
    occasion: "Party, Casual",
    featured: true,
    color: "Purple"
  },
  {
    id: 6,
    name: "Orange Tie-Dye Ikat Saree",
    category: "sarees",
    price: 2199,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1622182473147-579eab905ef9?w=900&q=80&auto=format&fit=crop",
    description: "Vibrant orange tie-dye Ikat saree with blended hues.",
    material: "Pure Cotton",
    occasion: "Casual, Day Events",
    featured: false,
    color: "Orange"
  },
  {
    id: 7,
    name: "Black & Grey Ikat Silk Saree",
    category: "sarees",
    price: 4499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?w=900&q=80&auto=format&fit=crop",
    description: "Sophisticated black and grey double Ikat silk saree for evening wear.",
    material: "Pure Silk",
    occasion: "Party, Reception",
    featured: true,
    color: "Black"
  },
  {
    id: 8,
    name: "Multicolor Warp Ikat Saree",
    category: "sarees",
    price: 3499,
    originalPrice: 4899,
    image: "https://images.unsplash.com/photo-1610189026205-27510cfc52f8?w=900&q=80&auto=format&fit=crop",
    description: "Colorful warp Ikat saree featuring a spectrum of hues in traditional zigzag patterns.",
    material: "Silk Cotton",
    occasion: "Festival, Wedding",
    featured: true,
    color: "Multicolor"
  },
  {
    id: 9,
    name: "Maroon Traditional Ikat Saree",
    category: "sarees",
    price: 2599,
    originalPrice: 3599,
    image: "https://images.unsplash.com/photo-1761125135351-268e72e39158?w=900&q=80&auto=format&fit=crop",
    description: "Classic maroon Ikat saree with traditional motifs symbolizing tradition and elegance.",
    material: "Pure Cotton",
    occasion: "Wedding, Festival",
    featured: false,
    color: "Maroon"
  },
  {
    id: 10,
    name: "Pink Weft Ikat Saree",
    category: "sarees",
    price: 1899,
    originalPrice: 2599,
    image: "https://images.unsplash.com/photo-1750008560217-53fd7066acec?w=900&q=80&auto=format&fit=crop",
    description: "Delicate pink weft Ikat saree with soft gradients. Lightweight and comfortable.",
    material: "Pure Cotton",
    occasion: "Casual, Office Wear",
    featured: true,
    color: "Pink"
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  try {
    const payload = req.body || {};
    const order = Object.assign({}, payload);
    order.id = 'PH' + Date.now().toString(36).toUpperCase();
    order.trackingId = 'TRK' + Date.now().toString(36).toUpperCase();
    order.date = new Date().toISOString();

    // Normalize items: accept either items array of {id,quantity} or single productId
    const rawItems = Array.isArray(order.items) ? order.items : (order.items ? [order.items] : (order.productId ? [{ id: order.productId, quantity: order.quantity || 1 }] : []));
    const itemsDetailed = rawItems.map(it => {
      const pid = it.productId || it.id || it.product || it;
      const qty = Number(it.quantity || it.qty || 1);
      const prod = products.find(p => Number(p.id) === Number(pid));
      return {
        id: prod ? prod.id : pid,
        name: prod ? prod.name : (it.name || 'Unknown item'),
        price: prod ? prod.price : Number(it.price || 0),
        quantity: qty
      };
    });

    const total = itemsDetailed.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
    const prebookingAmount = Math.round(total * 0.3);
    const remainingAmount = total - prebookingAmount;

    order.items = itemsDetailed;
    order.total = total;
    order.prebookingAmount = prebookingAmount;
    order.remainingAmount = remainingAmount;
    order.status = 'confirmed';

    orders.push(order);

    // Attempt to send confirmation email if configured
    const customerEmail = order.customer && order.customer.email;
    if (customerEmail && process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'your-email@gmail.com') {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `Order Confirmation - Pochampally Hub (Order ID: ${order.id})`,
        html: `<p>Thanks for your order. Your tracking id is <strong>${order.trackingId}</strong>.</p>`
      };
      transporter.sendMail(mailOptions).catch(err => console.error('Email send failed', err));
    } else if (customerEmail) {
      console.log('Email not configured on server. Would send to:', customerEmail, 'Order:', order.id);
    }

    res.json({ success: true, orderId: order.id, trackingId: order.trackingId, total: order.total });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.get('/api/orders/user/:phone', (req, res) => {
  const userOrders = orders.filter(o => o.customer.phone === req.params.phone);
  res.json(userOrders);
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-email', async (req, res) => {
  const { order, customerEmail } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
      process.env.EMAIL_USER === 'your-email@gmail.com') {
    console.log('Email not configured. Order ID:', order.id, 'Customer:', customerEmail);
    return res.json({ success: false, message: 'Email not configured on server' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Order Confirmation - Pochampally Hub (Order ID: ${order.id})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8b5a2b;">Order Confirmation - Pochampally Hub</h2>
        <p>Hi ${order.customer.name},</p>
        <p>Thank you for your order! Here are your order details:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Payment Option:</strong> 30% Prebooking</p>
          <p><strong>Total Amount:</strong> ₹${order.total}</p>
          <p><strong>Prebooking Paid (30%):</strong> ₹${order.prebookingAmount}</p>
          <p><strong>Remaining Balance (70%):</strong> ₹${order.remainingAmount}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3>Items:</h3>
          <ul>
            ${order.items.map(item => `<li>${item.name} x${item.quantity} - ₹${item.price * item.quantity}</li>`).join('')}
          </ul>
        </div>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Shipping Address:</h3>
          <p>${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}</p>
          <p><strong>Phone:</strong> ${order.customer.phone}</p>
        </div>
        <p>Save your Order ID to track your order.</p>
        <p>Thank you for shopping with Pochampally Hub!</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
