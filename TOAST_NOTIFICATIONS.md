# Toast Notification System (Gujlish)

## 🎯 Shu Che Aa Feature?

**Professional Toast Notifications** je website ma anywhere use kari shako:

✅ **Right side top corner** ma appear thay  
✅ **Fixed position** - Scroll kariye to pn visible  
✅ **Fade-in animation** - Right thi slide thaine aave  
✅ **Auto-dismiss** - 3 seconds pachi automatic hide thay  
✅ **Multiple types** - Success (green), Error (red), Info (blue), Warning (yellow)  
✅ **Stackable** - Multiple toasts ek sathe show thai shake

---

## 🚀 Kevi Rite Use Karvu?

### Step 1: Import useToast Hook

```javascript
"use client";
import { useToast } from "../context/ToastContext";
```

### Step 2: Use in Component

```javascript
export default function MyComponent() {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast("Operation successful!", "success");
  };

  const handleError = () => {
    showToast("Something went wrong!", "error");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
}
```

---

## 📋 Toast Types

### 1. Success (Green) ✓

```javascript
showToast("Account created successfully!", "success");
showToast("Order placed!", "success");
showToast("Login successful!", "success");
```

### 2. Error (Red) ✕

```javascript
showToast("Invalid credentials", "error");
showToast("Failed to send OTP", "error");
showToast("Network error occurred", "error");
```

### 3. Info (Blue) ℹ

```javascript
showToast("Please verify your email", "info");
showToast("New update available", "info");
```

### 4. Warning (Yellow) ⚠

```javascript
showToast("Your session will expire soon", "warning");
showToast("Please complete your profile", "warning");
```

---

## ⚙️ Parameters

```javascript
showToast(message, type, duration);
```

| Parameter  | Type   | Default     | Description                                       |
| ---------- | ------ | ----------- | ------------------------------------------------- |
| `message`  | string | Required    | Toast message text                                |
| `type`     | string | `'success'` | Toast type: 'success', 'error', 'info', 'warning' |
| `duration` | number | `3000`      | Auto-dismiss time in milliseconds                 |

### Examples:

```javascript
// Default (3 seconds)
showToast("Success!", "success");

// Custom duration (5 seconds)
showToast("Important message", "info", 5000);

// Quick message (1 second)
showToast("Copied!", "success", 1000);
```

---

## 💡 Real Examples

### Login Page:

```javascript
"use client";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast("Login successful! Redirecting...", "success");
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        showToast("Invalid credentials", "error");
      }
    } catch (error) {
      showToast("Network error. Please try again.", "error");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Signup Page:

```javascript
const handleSendOtp = async () => {
  try {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });

    if (res.ok) {
      showToast("OTP sent successfully!", "success");
    } else {
      const data = await res.json();
      showToast(data.message || "Failed to send OTP", "error");
    }
  } catch (error) {
    showToast("Error connecting to server", "error");
  }
};
```

### Cart Page:

```javascript
const handleAddToCart = (product) => {
  addToCart(product);
  showToast(`${product.name} added to cart!`, "success", 2000);
};

const handleRemoveFromCart = (productId) => {
  removeFromCart(productId);
  showToast("Item removed from cart", "info", 2000);
};

const handleClearCart = () => {
  clearCart();
  showToast("Cart cleared successfully", "success");
};
```

### Profile Page (Logout):

```javascript
const handleLogout = () => {
  localStorage.removeItem("user");
  showToast("Logged out successfully", "success");
  setTimeout(() => router.push("/login"), 1500);
};
```

---

## 🎨 Visual Design

### Position:

```
┌─────────────────────────────────────┐
│                          [Toast 1]  │ ← Top right
│                          [Toast 2]  │ ← Stacked
│                          [Toast 3]  │ ← Multiple
│                                     │
│         Website Content             │
│                                     │
└─────────────────────────────────────┘
```

### Colors:

| Type    | Background       | Border      | Icon |
| ------- | ---------------- | ----------- | ---- |
| Success | Green (#10B981)  | Dark Green  | ✓    |
| Error   | Red (#EF4444)    | Dark Red    | ✕    |
| Info    | Blue (#3B82F6)   | Dark Blue   | ℹ    |
| Warning | Yellow (#F59E0B) | Dark Yellow | ⚠    |

---

## 🔧 Features

### Auto-Dismiss:

- Default: 3 seconds
- Customizable per toast
- Smooth fade-out animation

### Manual Close:

- X button on each toast
- Click to dismiss
- Instant removal

### Animations:

- **Slide-in**: Right thi left ma slide
- **Fade-in**: Opacity 0 to 1
- **Fade-out**: Smooth disappear

### Stacking:

- Multiple toasts show together
- Vertical spacing: 12px
- Max visible: Unlimited (auto-scroll)

---

## 📱 Responsive

### Desktop:

```
Position: top-4 right-4
Width: 300px - 400px
```

### Mobile:

```
Position: top-4 right-4
Width: Auto (responsive)
Padding adjusted
```

---

## 🐛 Replace Old Alerts

### Before (Old Alert):

```javascript
// ❌ Old way - browser alert
alert("Login successful!");
alert("Error occurred");
```

### After (New Toast):

```javascript
// ✅ New way - professional toast
showToast("Login successful!", "success");
showToast("Error occurred", "error");
```

---

## 📊 Migration Guide

### Find & Replace:

**Success Messages:**

```javascript
// Old
alert("Success!");
setSuccess("Success!");

// New
showToast("Success!", "success");
```

**Error Messages:**

```javascript
// Old
alert("Error!");
setError("Error!");

// New
showToast("Error!", "error");
```

**Info Messages:**

```javascript
// Old
alert("Please wait...");

// New
showToast("Please wait...", "info");
```

---

## 🎯 Best Practices

### ✅ Do's:

1. **Short messages** - Keep under 50 characters
2. **Clear actions** - "Login successful" not just "Success"
3. **Appropriate types** - Use correct color for context
4. **Reasonable duration** - 2-4 seconds for most messages

### ❌ Don'ts:

1. **Long messages** - Avoid paragraphs
2. **Too many toasts** - Don't spam user
3. **Wrong types** - Don't use success for errors
4. **Too fast** - Minimum 1 second duration

---

## 🚀 Implementation Status

| Page     | Status                | Notes            |
| -------- | --------------------- | ---------------- |
| Login    | ⏳ Ready to implement | Replace alerts   |
| Signup   | ⏳ Ready to implement | Replace alerts   |
| Cart     | ⏳ Ready to implement | Add/remove items |
| Profile  | ⏳ Ready to implement | Logout, updates  |
| Checkout | ⏳ Ready to implement | Order success    |
| Admin    | ⏳ Ready to implement | CRUD operations  |

---

## 🎉 Summary

**Have tame:**

✅ Professional toast notification system  
✅ Right side top corner (fixed)  
✅ Beautiful animations  
✅ Multiple types (success, error, info, warning)  
✅ Auto-dismiss with custom duration  
✅ Easy to use (`showToast()`)  
✅ Works anywhere in website  
✅ Stackable multiple toasts

**Next Steps:**

1. Import `useToast` in your components
2. Replace all `alert()` calls
3. Replace `setError()` and `setSuccess()` states
4. Use appropriate toast types
5. Enjoy professional notifications! 🎉

---

Made with ❤️ by Antigravity AI  
Date: 12 January 2026
