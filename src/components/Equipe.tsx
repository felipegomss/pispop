"use client";
import React, { useState, useEffect } from "react";
import PsychologistCard from "./PsychologistCard";
import { Psychologist } from "@/types/Psychologist";
import { collection, getDocs } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { Slide } from "react-awesome-reveal";
import { db } from "@/utils/firebaseConfig";
import "firebase/firestore";

const Equipe: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 12;

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

  const indexOfLastPsychologist = (currentPage + 1) * itemsPerPage;
  const indexOfFirstPsychologist = indexOfLastPsychologist - itemsPerPage;
  const currentPsychologists = psychologists.slice(
    indexOfFirstPsychologist,
    indexOfLastPsychologist
  );

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="max-w-7xl p-4 m-auto my-14 flex flex-col gap-8" id="equipe">
      <h1 className="text-3xl font-bold text-blue-900">
        Conheça Nossos Psicólogos
      </h1>
      {loading ? (
        <Skeleton count={4} height={350} />
      ) : psychologists.length > 0 ? (
        <>
          <Slide triggerOnce>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentPsychologists.map((psychologist) => (
                <PsychologistCard
                  key={psychologist.id}
                  psychologist={psychologist}
                />
              ))}
            </div>
          </Slide>
          {psychologists.length > itemsPerPage && (
            <div className="flex justify-center mt-8">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={Math.ceil(psychologists.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination max-w-screen flex justify-center space-x-4"
                pageClassName="px-3 py-1 bg-blue-500 text-white rounded"
                previousClassName="px-3 py-1 bg-gray-500 text-white rounded"
                nextClassName="px-3 py-1 bg-gray-500 text-white rounded"
                breakClassName="px-3 py-1 bg-gray-300 rounded"
                activeClassName="bg-blue-700"
                activeLinkClassName="text-white"
              />
            </div>
          )}
        </>
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

export default Equipe;
