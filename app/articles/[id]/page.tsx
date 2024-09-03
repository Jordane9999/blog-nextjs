"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/db/configFirebase";
import { DataType, UpdatePageProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function article({ params }: UpdatePageProps) {
  const [loadin, setLoadin] = useState(true);
  const [articles, setArticles] = useState<DataType | null>();

  useEffect(() => {
    const articleId = params.id as string;
    const unsubscribe = onSnapshot(collection(db, "articles"), (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setArticles({ id: doc.id, ...data } as DataType);
        setLoadin(false);
      });
    });
    return () => unsubscribe();
  }, [params.id]);

  if (loadin || !articles) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        Chargement en cour
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] w-full mx-auto p-3 ">
      <div className="mb-4">
        <Link href={"/"}>
          <Button>Retour</Button>
        </Link>
      </div>
      <Image
        src={articles.image || "placeholder.jpg"}
        width={1000}
        height={500}
        alt="titre du post"
      />
      <h1 className="text-xl uppercase font-black mt-4"> {articles.title} </h1>
      <p className="text-muted-foreground mt-2">{articles.authorName}</p>
      <p className="mt-4">{articles.description}</p>
    </section>
  );
}
