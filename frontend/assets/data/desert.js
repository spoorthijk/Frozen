import iceCreamImg01 from "../images/icecream-chocolate.jpg";
import iceCreamImg02 from "../images/icecream-vanilla.jpg";
import iceCreamImg03 from "../images/icecream-strawberry.jpg";
import iceCreamImg04 from "../images/icecream-mango.jpg";
import iceCreamImg05 from "../images/icecream-butterscotch.jpg";
import iceCreamImg06 from "../images/icecream-cookiescream.jpg";
import iceCreamImg07 from "../images/icecream-pistachio.jpg";
import iceCreamImg08 from "../images/icecream-blueberry.jpg"; // New Image

const iceCreamMenu = [
  {
    id: "01",
    name: "Chocolate Delight",
    flavor: "Chocolate",
    price: 120,
    size: "Medium",
    description: "Rich and creamy chocolate ice cream made with premium cocoa.",
    reviews: [
      {
        name: "Alice",
        rating: 4.8,
      },
      {
        name: "Bob",
        rating: 5,
      },
    ],
    avgRating: 4.7,
    photo: iceCreamImg01,
    featured: true,
  },
  {
    id: "02",
    name: "Classic Vanilla",
    flavor: "Vanilla",
    price: 100,
    size: "Medium",
    description: "Smooth and creamy vanilla ice cream with a touch of real vanilla beans.",
    reviews: [
      {
        name: "Charlie",
        rating: 4.5,
      },
    ],
    avgRating: 4.5,
    photo: iceCreamImg02,
    featured: true,
  },
  {
    id: "03",
    name: "Strawberry Bliss",
    flavor: "Strawberry",
    price: 110,
    size: "Medium",
    description: "Fresh strawberry-flavored ice cream with real fruit chunks.",
    reviews: [
      {
        name: "Charlie",
        rating: 4.5,
      },
    ],
    avgRating: 4.6,
    photo: iceCreamImg03,
    featured: true,
  },
  {
    id: "04",
    name: "Mango Magic",
    flavor: "Mango",
    price: 130,
    size: "Medium",
    description: "Tropical mango-flavored ice cream with a smooth, fruity taste.",
    reviews: [
      {
        name: "David",
        rating: 4.9,
      },
    ],
    avgRating: 4.9,
    photo: iceCreamImg04,
    featured: true,
  },
  {
    id: "05",
    name: "Butterscotch Crunch",
    flavor: "Butterscotch",
    price: 125,
    size: "Medium",
    description: "Delicious butterscotch ice cream with crunchy caramel bits.",
    reviews: [
      {
        name: "David",
        rating: 4.9,
      },
    ],
    avgRating: 4.4,
    photo: iceCreamImg05,
    featured: false,
  },
  {
    id: "06",
    name: "Cookies & Cream",
    flavor: "Cookies & Cream",
    price: 140,
    size: "Large",
    description: "A perfect blend of vanilla ice cream and chocolate cookie pieces.",
    reviews: [  {
      name: "Emma",
      rating: 4.6,
    },],
    avgRating: 4.7,
    photo: iceCreamImg06,
    featured: false,
  },
  {
    id: "07",
    name: "Pistachio Dream",
    flavor: "Pistachio",
    price: 150,
    size: "Large",
    description: "Smooth pistachio ice cream with crunchy nut toppings.",
    reviews: [],
    avgRating: 4.8,
    photo: iceCreamImg07,
    featured: false,
  },
  {
    id: "08",
    name: "Blueberry Swirl",
    flavor: "Blueberry",
    price: 135,
    size: "Medium",
    description: "Creamy blueberry ice cream with a luscious swirl of real blueberries.",
    reviews: [],
    avgRating: 4.6,
    photo: iceCreamImg08,
    featured: true,
  },
];

export default iceCreamMenu;
