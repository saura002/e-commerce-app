# Project Structure

```
/e-commerce-shoppify-app
├── src
│   ├── api
│   │   └── fakeApi.ts         # Mock API for products and cart
│   ├── components             # (Reusable UI components, if any)
│   ├── pages
│   │   ├── ProductListPage.tsx
│   │   ├── ProductDetailsPage.tsx
│   │   └── CartPage.tsx
│   ├── types
│   │   ├── Product.ts
│   │   └── CartItem.ts
│   ├── App.tsx                # Main app with routing
│   └── index.tsx              # Entry point
├── README.md
├── Project-structure.md
├── package.json
```

- `src/api/`: Mock API logic
- `src/pages/`: Main app pages
- `src/types/`: TypeScript types
- `src/components/`: (For future reusable components) 