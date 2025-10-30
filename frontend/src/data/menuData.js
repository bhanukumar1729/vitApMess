// We'll use placeholder images. Replace these with your actual image URLs.
export const menuData = {
  breakfast: {
    title: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=crop',
    // 'sections' array is replaced with a single 'items' array
    items: [
      { name: 'Classic Pancakes' },
      { name: 'Avocado Toast' },
      { name: 'Scrambled Eggs' },
      { name: 'Orange Juice' },
      { name: 'Coffee' },
    ],
  },
  lunch: {
    title: 'Lunch',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=crop',
    // All items are merged into one array
    items: [
      { name: 'Cheeseburger' },
      { name: 'Cheese sandwich' },
      { name: 'Chicken burgers' },
      { name: 'Spicy chicken' },
      { name: 'Hot dog' },
      { name: 'Nuggets' },
      { name: 'French Fries' },
    ],
  },
  dinner: {
    title: 'Dinner',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=crop',
    // All items are merged into one array
    items: [
      { name: 'Roasted Chicken' },
      { name: 'Grilled Salmon' },
      { name: 'Steak Frites' },
      { name: 'Fruit Salad' },
      { name: 'Cocktails' },
      { name: 'Sandwich' },
    ],
  },
  snacks: {
    title: 'Snacks',
    image: 'https://images.unsplash.com/photo-1559058474-5d59e3c3b7f3?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=600&fit=crop',
    items: [
      { name: 'Samosa' },
      { name: 'Cookies' },
      { name: 'Iced Tea' },
      { name: 'French Fries' },
      { name: 'Puff Pastry' },
    ],
  },
};