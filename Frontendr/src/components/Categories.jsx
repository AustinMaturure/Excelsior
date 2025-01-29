import { useEffect, useState } from "react";
import CategorySection from "./CategorySection.jsx";

export default function Categories() {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/articles-by-category/"
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="categories">
      {Object.entries(categories).map(([category, articles]) => (
        <CategorySection
          key={category}
          category={category}
          articles={articles}
        />
      ))}
    </div>
  );
}
