import React, { useEffect } from 'react';

export function AboutPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <button className="btn-back" onClick={() => onBack('home')}>← Voltar para o Início</button>

        <article className="about-content glass animated">
          <header className="about-header">
            <span className="detail-category">Nossa Empresa</span>
            <h1>Sobre Nós</h1>
          </header>

          <section className="about-section">
            <h2>Nossa História</h2>
            <p>Minha jornada no mundo da impressão 3D começou há cerca de dois anos. Durante esse período, adquiri conhecimento aprofundado em montagem e manutenção de equipamentos, trabalhando diretamente na área e compreendendo todos os detalhes técnicos necessários para o sucesso neste segmento.</p>
            <p>Após essa minha experiência acumulada, decidi empreender por conta própria. Investi meus recursos em uma impressora 3D iniciante da marca Two Trees Bluer Plus, marcando o início oficial de nossa operação. Nessa etapa, contei com o apoio da minha noiva, e juntos começamos a estruturar nosso negócio.</p>
            <p>Com o crescimento progressivo, reinvestimos nossos ganhos e realizamos uma atualização significativa de equipamento, adquirindo uma impressora Bambu Lab A1 com o módulo AMS. Esse investimento potencializou nossa capacidade produtiva e qualidade de trabalho.</p>
          </section>

          <section className="about-section">
            <h2>Presente e Alcance</h2>
            <p>Hoje, nossa empresa atua tanto no mercado nacional quanto internacional. Realizamos vendas para clientes em todo o Brasil, assim como para os Estados Unidos e Venezuela, consolidando nossa posição como fornecedora confiável de produtos impressos em 3D em diferentes regiões.</p>
            <p>Continuamos comprometidos com a qualidade, inovação e excelência no atendimento, mantendo os valores que nos levaram a crescer desde o início: dedicação, conhecimento técnico e foco no cliente.</p>
          </section>
        </article>
      </div>
    </div>
  );
}
