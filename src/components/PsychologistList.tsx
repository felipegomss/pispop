"use client";
import React, { useState, useEffect } from "react";
import PsychologistCard from "./PsychologistCard";
import { Psychologist } from "@/types/Psychologist";
import "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import Skeleton from "react-loading-skeleton";
import { Slide } from "react-awesome-reveal";

interface PsychologistListProps {}

const PsychologistList: React.FC<PsychologistListProps> = () => {
  const [loading, setLoading] = useState(true);
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);

  useEffect(() => {
    const loadPsychologists = async () => {
      try {
        const psychologistsRef = collection(db, "psychologists");
        const querySnapshot = await getDocs(psychologistsRef);

        const psychologistList: Psychologist[] = querySnapshot.docs.map(
          (doc) => ({
            ...(doc.data() as Psychologist),
            id: doc.id,
          })
        );

        setPsychologists(psychologistList);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar lista de psicólogos:", error);
        setLoading(false);
      }
    };
    loadPsychologists();
  }, []);

  return (
    <div className="max-w-7xl p-4 m-auto my-14 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-blue-900">
        Conheça Nossos Psicólogos
      </h1>
      {loading ? (
        <Skeleton count={4} height={350} />
      ) : psychologists.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Slide triggerOnce>
            {psychologists.map((psychologist) => (
              <PsychologistCard
                key={psychologist.id}
                psychologist={psychologist}
              />
            ))}
          </Slide>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">
            Ainda não temos psicólogos cadastrados, mas estamos trabalhando para
            trazer profissionais incríveis em breve! <br />
            Enquanto isso, nos siga no{" "}
            <a
              href="https://www.instagram.com/psi.popular/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold underline"
            >
              Instagram
            </a>{" "}
            para ficar por dentro das novidades.
          </p>
        </div>
      )}
    </div>
  );
};

export default PsychologistList;
