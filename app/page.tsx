"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/db/configFirebase";
import { DataFormType, DataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [articles, setArticles] = useState<DataType[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "articles"), (snapshot) => {
      const data: DataType[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as DataType);
      });
      setArticles(data);
    });
    return () => unsubscribe();
  }, []);
  return (
    <section className="p-4 mt-4">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3  ">
        {articles.map((article) => (
          <Link href={`articles/${article.id}`} key={article.id}>
            <Card className="p-3 hover:translate-y-[-10px] translate-all ">
              <Image
                src={`${article.image}`}
                width={500}
                height={500}
                alt="Image cover article"
                className="w-full h-[500px] object-cover "
              />
              <h2 className="text-xl font-black uppercase mt-4">
                {article.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                ecrie par {article.authorName}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
