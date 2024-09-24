import supabase from "./supabase";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./App.css";
import FactList from "./FactList";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import Loader from "./Loader";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState();
  const [isUploading, setIsUploading] = useState(false);
  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);
        let query = supabase.from("facts").select("*");
        if (currCategory !== "all") {
          query = query.eq("category", currCategory);
        }
        let { data: facts, error } = await query
          .order("votesInteresting", { ascending: true })
          .limit(1000);
        if (!error) {
          setFacts(facts);
        } else {
          alert("There was a problem loading this data");
        }

        setIsLoading(false);
      }
      getFacts();
    },
    [currCategory]
  );
  return (
    <div className="app ">
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          categories={CATEGORIES}
          setFacts={setFacts}
          facts={facts}
          setShowForm={setShowForm}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:h-[80vh] ">
        <CategoryFilter
          initialFacts={initialFacts}
          categories={CATEGORIES}
          facts={facts}
          setCurrCategory={setCurrCategory}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-y-auto md:max-h-[calc(80vh-100px)]">
            <FactList
              initialFacts={initialFacts}
              categories={CATEGORIES}
              setFacts={setFacts}
              facts={facts}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
