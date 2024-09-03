"use client";

import { Mail, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useFirebase } from "@/context/articleContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Dashboard() {
  const { user } = useAuth();

  const { articles, deleteArticle } = useFirebase();

  console.log(user);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black uppercase">
            Dashbord
          </CardTitle>
          <CardDescription>Votre Profile</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {user?.photoURL && (
              <li className="flex items-center space-x-2">
                {" "}
                <Image
                  src={user?.photoURL}
                  width={50}
                  height={50}
                  alt={`Photo de profil de ${user?.displayName}`}
                />{" "}
              </li>
            )}
            <li className="flex itemes-center space-x-2 my-2">
              <span>
                <User />
              </span>
              <span>
                {" "}
                Votre Nom : <b /> {user?.displayName}{" "}
              </span>
            </li>
            <li className="flex itemes-center space-x-2 my-2">
              <span>
                <Mail />
              </span>
              <span>
                {" "}
                Votre Email : <b /> {user?.email}{" "}
              </span>
            </li>
            <li className="tex-muted-fore-ground">
              Menbre depuis le{" "}
              {user?.metadata?.creationTime
                ? new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full"
                  }).format(new Date(user.metadata.creationTime))
                : "Date Inconnue"}
            </li>
          </ul>
        </CardContent>
      </Card>
      <div className="flex flex-col space-y-2 mt-4 p-3">
        <h1 className="text-2xl font-black uppercase">Vos Articles</h1>
        <p className="text-muted-foreground text-lg">Vos post publicées</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {articles.map((item, index) => (
            <Card key={index} className="p-3">
              <div className="flex gap-2 mb-4">
                <Image
                  src={`${item.image}`}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="max-w-[200px] h-[100px] object-cover"
                />
                <div className="flex flex-col space-y-4">
                  <h3> {item.title} </h3>
                </div>
              </div>
              <div className="flex item-center justify-between">
                <Link href={`dashboard/articleUser/${item.id}`}>
                  <Button>Modifier</Button>
                </Link>
                <Button
                  onClick={() => deleteArticle(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Suprimer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
