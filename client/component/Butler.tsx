"use client";

import { convertNumberToHex } from "lib/util";
import { useEffect, useState } from "react";

// Admin for a site.
const Butler = () => {
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/100/background/color?rgb=aabbcc");
        if (!response.ok) {
          console.error(response);
          throw new Error("Failed to fetch.");
        }

        const data = await response.json();
        setReply(JSON.stringify(data, convertNumberToHex));
      } catch (err) {
        console.error(err);
        setError("Error fetching message.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <p>{reply}</p>;
};

export default Butler;
