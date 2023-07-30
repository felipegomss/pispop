"use client";
import React from "react";
import Image from "next/image";
import "../app/globals.css";
import { HeartHandshake } from "lucide-react";
import { JackInTheBox } from "react-awesome-reveal";

const Hero = () => {
  return (
    <section className="h-screen flex p-4 relative bg-[linear-gradient(to_right_top,#10b981,#00b8ac,#00b3d4,#00aaf0,#009bf8,#0096f0,#0090e9,#008be1,#008dca,#0089a5,#00827d,#047857)] text-white text-center py-20">
      <div className="w-max-7xl md:bg-hero bg-right bg-contain bg-no-repeat md:w-1/2 text-start gap-10 m-auto container flex flex-col items-start justify-center">
        {/* <div className="w-full md:w-1/2 m-auto text-start gap-8"> */}
        <h1 className="text-6xl font-bold md:w-2/3">
          Saúde que cabe na sua{" "}
          <span className="text-blue-950 text-shadow">mente</span> e no seu{" "}
          <span className="text-blue-950 text-shadow">bolso</span>!
        </h1>
        <div className=" md:w-2/3">
          <p className="text-lg">
            Bem-vindo(a) ao PsiPop, o seu espaço seguro para cuidar da saúde
            mental. Nossos psicólogos qualificados estão prontos para te
            acompanhar na jornada de autoconhecimento, enfrentar desafios
            emocionais e alcançar um maior bem-estar. Cuide de si mesmo(a) hoje
            mesmo com a comodidade da terapia online, feita no conforto da sua
            casa. Junte-se a nós e descubra o poder transformador da terapia
            acessível e conveniente.
          </p>
          <ul className="ml-10 list-disc mt-4">
            <li>Cuide da sua saúde mental de forma acessível e qualificada.</li>
            <li>Encontre o suporte emocional que precisa.</li>
            <li>
              Conecte-se a psicólogos especializados a um preço que cabe no seu
              orçamento.
            </li>
          </ul>
        </div>
        <JackInTheBox triggerOnce>
          <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow hover:bg-blue-50 transition-colors flex gap-2">
            Quero começar minha jornada de cuidado! <HeartHandshake />
          </button>
        </JackInTheBox>
        {/* </div> */}
        {/* <div className="w-full md:w-1/2 relative">
          <Image
            src="/hero-image.webp"
            width={300}
            height={300}
            alt="Hero Image"
            className="rounded-3xl md:w-1/2 m-auto"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
