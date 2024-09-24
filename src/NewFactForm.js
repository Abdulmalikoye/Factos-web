import React, { useState } from "react";
import "./App.css";
import supabase from "./supabase";

function isValidUrl(string) {
  try {
    new URL(string);
    return true; // If the URL constructor doesn't throw, it's valid
  } catch (err) {
    return false; // If an error is thrown, the string is not a valid URL
  }
}
const NewFactForm = ({
  categories,
  setFacts,
  setShowForm,
  setIsUploading,
  isUploading,
}) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [cat, setCat] = useState("");

  const textLength = text.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text && isValidUrl(source) && cat && textLength <= 200) {
      console.log("There is valid data");
    }
    // const newFacts = {
    //   id: Math.round(Math.random * 100000),
    //   text,
    //   source,
    //   cat,
    //   votesInteresting: 24,
    //   votesMindblowing: 9,
    //   votesFalse: 4,
    //   createdIn: new Date().getFullYear(),
    // };
    setIsUploading(true);
    const { data: newFact, error } = await supabase
      .from("facts")
      .insert([{ text, source, category: cat }])
      .select();
    setText("");
    setSource("");
    setCat("");
    setShowForm(false);
    setIsUploading(false);
    if (!error) {
      setFacts((facts) => [newFact[0], ...facts]);
    }
  };
  return (
    <div className="fact-form">
      <form
        className="flex flex-col gap-3   items-start w-[100%] "
        onSubmit={handleSubmit}
        disabled={isUploading}
      >
        <input
          className="w-full font-coiny "
          type="text"
          placeholder="Share a fact with the world..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isUploading}
        />
        <span>{200 - textLength}</span>
        <input
          className="w-full font-coiny block "
          type="text"
          placeholder="Trustworthy source..."
          value={source}
          onChange={(e) => setSource(e.target.value)}
          disabled={isUploading}
        />
        <select
          className="w-full font-coiny "
          onChange={(e) => setCat(e.target.value)}
          disabled={isUploading}
        >
          <option value="">Choose category:</option>
          {categories &&
            categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name.toUpperCase()}
              </option>
            ))}
        </select>
        <button className="btn btn-all-categories" disabled={isUploading}>
          Post
        </button>
      </form>
    </div>
  );
};

export default NewFactForm;
