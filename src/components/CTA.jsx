import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WHATSAPP_NUMBER } from '../data/constants';

export function CTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = true;
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      const message = `*CONTATO PARA PROJETO PERSONALIZADO*\n` +
        `--------------------------------------------\n` +
        `Olá, Studio 3D Formará! Gostaria de solicitar um atendimento para um novo projeto.\n\n` +
        `*Cliente:* ${name}\n` +
        `*E-mail:* ${email}\n\n` +
        `Aguardo o retorno para discutirmos os detalhes técnicos, materiais e prazos.`;
      const msgEncoded = encodeURIComponent(message);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msgEncoded}`, '_blank');
    }
  };

  return (
    <section className="cta-section reveal glass" id="contato" ref={ref}>
      <h2>Pronto para Dar Vida ao Seu Projeto?</h2>
      {submitted ? (
        <div className="form-success">🎉 Obrigado! Entraremos em contato em breve.</div>
      ) : (
        <>
          <form className="cta-form" onSubmit={handleSubmit}>
            <input
              type="text" placeholder="Seu nome" value={name}
              onChange={e => setName(e.target.value)}
              className={errors.name ? 'error' : ''}
            />
            <input
              type="email" placeholder="Seu e-mail" value={email}
              onChange={e => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            <button type="submit">Solicitar Orçamento Grátis</button>
          </form>
          <p className="cta-micro">Resposta em até 2 horas úteis • Sem compromisso</p>
        </>
      )}
    </section>
  );
}
