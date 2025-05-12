import { ArrowRight, ChevronDown, Sparkles, Target, Zap } from 'lucide-react';
import React from 'react';
import { Button } from './Button';

export function Hero() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 animate-gradient-slow">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-float">
            <Sparkles className="w-4 h-4 text-primary-200" />
            <span className="text-sm font-medium text-primary-200">
              Agence de Communication 360°
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block mb-2 animate-fade-in-up">Transformons vos idées</span>
            <span className="block bg-gradient-to-r from-primary-200 via-primary-300 to-primary-400 text-transparent bg-clip-text animate-gradient-x">
              en succès digital
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed animate-fade-in-up-delay">
            Nous créons des expériences digitales uniques qui captent l'attention, 
            engagent votre audience et transforment vos visiteurs en clients fidèles.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up-delay-2">
            <Button
              variant="white"
              size="lg"
              icon={ArrowRight}
              className="group"
            >
              Démarrer un projet
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Sparkles}
              className="group"
            >
              Découvrir nos services
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up-delay-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <Target className="w-8 h-8 text-primary-300 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">+200 Projets</h3>
              <p className="text-gray-400">Réalisés avec succès pour nos clients</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <Sparkles className="w-8 h-8 text-primary-300 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">98% Satisfaction</h3>
              <p className="text-gray-400">De nos clients recommandent nos services</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <Zap className="w-8 h-8 text-primary-300 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">15+ Experts</h3>
              <p className="text-gray-400">Une équipe passionnée à votre service</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </div>
    </div>
  );
}