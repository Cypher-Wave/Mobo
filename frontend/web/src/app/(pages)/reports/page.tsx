"use client";

import styles from "./Reports.module.css";

interface Harvest {
  _id: string;
  harvestDate: string;
  harvestStart: string;
  harvestEnd: string;
  harvestDuration: string;
  harvestedQuantity: number;
  planting: { plantingName: string };
  quality: number;
}

interface PagesLayoutProps {
  children?: React.ReactNode;
  harvests?: Harvest[];
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  onCreate?: (event: React.FormEvent) => void;
  onDelete?: (event: React.FormEvent) => void;
}

const Reports = ({
  harvests = [],
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
}: PagesLayoutProps) => {
  return (
    <>
      {/* Botões */}
      <div className={styles.buttonContainer}>
        <button className="btn btn-primary">Criar Registro</button>
        <button className="btn btn-primary" type="submit">
          Excluir Registro
        </button>
      </div>

      {/* Tabela */}
      <div className={styles.table}>
        <div className={styles.userList}>
          {/* Cabeçalho */}
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>SELECIONAR</div>
            <div className={styles.tableCell}>ÍNDICE</div>
            <div className={styles.tableCell}>DATA COLHEITA</div>
            <div className={styles.tableCell}>HORA INÍCIO</div>
            <div className={styles.tableCell}>HORA TÉRMINO</div>
            <div className={styles.tableCell}>DURAÇÃO</div>
            <div className={styles.tableCell}>QUANTIDADE COLHIDA</div>
            <div className={styles.tableCell}>PLANTAÇÃO</div>
            <div className={styles.tableCell}>QUALIDADE</div>
          </div>

          {/* Linha mockada */}
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>
              <input
                type="checkbox"
                className={styles.selectRecord}
                name="selected_id"
              />
            </div>
            <div className={styles.tableCell}>1</div>
            <div className={styles.tableCell}>27/10/2025</div>
            <div className={styles.tableCell}>10:00</div>
            <div className={styles.tableCell}>12:00</div>
            <div className={styles.tableCell}>2:00</div>
            <div className={styles.tableCell}>500kg</div>
            <div className={styles.tableCell}>Área 1</div>
            <div className={styles.tableCell}>9/10</div>
          </div>
        </div>

        {/* Paginação */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`?page=${page}`}
              className={page === currentPage ? styles.active : styles.pageLink}
            >
              {page}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reports;
