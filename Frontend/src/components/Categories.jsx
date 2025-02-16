import { useEffect, useState } from "react";
import CategorySection from "./CategorySection.jsx";

export default function Categories() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles-by-category/`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
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
          loading={loading}
        />
      ))}
    </div>
  );
}
