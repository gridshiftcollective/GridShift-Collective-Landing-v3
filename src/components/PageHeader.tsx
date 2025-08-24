import React from "react";

type Props = {
  title: string;
  subtitle?: string;
};

const PageHeader = ({ title, subtitle }: Props) => {
  return (
    <section className="pt-20 pb-8 px-6 bg-background">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
