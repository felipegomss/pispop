/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/utils/firebaseConfig";
import { Psychologist } from "@/types/Psychologist";
import EditModal from "@/components/modal/EditModal";
import AddModal from "@/components/modal/AddModal";
import PsychologistsList from "@/components/dashboard/PsychologistsList";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function PsychologistsDashboard() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editPsychologist, setEditPsychologist] = useState<
    Partial<Psychologist>
  >({});
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        loadPsychologists();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    } catch (error) {
      console.error("Erro ao carregar lista de psicólogos:", error);
    }
  };

  const handleAddPsychologist = async (data: Partial<Psychologist>) => {
    try {
      const psychologistRef = await addDoc(
        collection(db, "psychologists"),
        data
      );

      const newPsychologistData: Psychologist = {
        id: psychologistRef.id,
        email: data.email || "",
        nome: data.nome || "",
        crp: data.crp || "",
        regiao: data.regiao || "",
        instagram: data.instagram || "",
        numeroWhatsapp: data.numeroWhatsapp || "",
        dataNascimento: data.dataNascimento || "",
        cpf: data.cpf || "",
        formacoes: data.formacoes || [],
        experiencias: data.experiencias || [],
        anoGraduacao: data.anoGraduacao || 0,
        abordagem: data.abordagem || "",
        valorConsulta: data.valorConsulta || 0,
        imageUrl: data.imageUrl || "",
      };

      setPsychologists([...psychologists, newPsychologistData]);
    } catch (error) {
      console.error("Erro ao adicionar psicólogo:", error);
    }
  };

  const handleEditPsychologist = async (
    id: string | undefined,
    updatedData: Partial<Psychologist>
  ) => {
    try {
      if (!id) return;

      const psychologistRef = doc(db, "psychologists", id);
      await updateDoc(psychologistRef, updatedData);
      setPsychologists(
        psychologists.map((psychologist) =>
          psychologist.id === id
            ? { ...psychologist, ...updatedData }
            : psychologist
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar psicólogo:", error);
    }
  };

  const handleDeletePsychologist = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Tem certeza que deseja apagar este psicólogo?"
      );
      if (confirmed) {
        await deleteDoc(doc(db, "psychologists", id));
        setPsychologists(
          psychologists.filter((psychologist) => psychologist.id !== id)
        );
        window.dispatchEvent(new Event("psychologistDeleted"));
      }
    } catch (error) {
      console.error("Erro ao apagar psicólogo:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    const handleReloadPage = () => {
      window.location.reload();
    };

    window.addEventListener("psychologistDeleted", handleReloadPage);

    return () => {
      window.removeEventListener("psychologistDeleted", handleReloadPage);
    };
  }, [psychologists]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <span>
            <Link href={"/"}>
              <h1 className="text-white text-2xl font-bold">PsiPop</h1>
            </Link>
            <h2 className="text-white text-sm font-bold">Dashboard</h2>
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex gap-2"
          >
            Sair <LogOut />
          </button>
        </div>
      </header>
      <div className="container mx-auto mt-8 p-4">
        <PsychologistsList
          psychologists={psychologists}
          onEdit={(psychologist) => {
            setEditPsychologist(psychologist);
            setIsEditModalOpen(true);
          }}
          onDelete={(id) => handleDeletePsychologist(id)}
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(data) => handleEditPsychologist(editPsychologist.id, data)}
        initialValues={editPsychologist}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data) => handleAddPsychologist(data)}
      />
    </div>
  );
}
