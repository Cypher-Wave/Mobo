"use client";

import { useState, useEffect } from "react";
import { IHarvest } from "@/types/Harvest";
import api from "@/services/api";
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
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
}: PagesLayoutProps) => {
  const [harvests, setHarvests] = useState<IHarvest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const res = await api.get("/harvest");
        setHarvests(res.data.harvests);
      } catch (error) {
        console.error("Erro ao buscar harvests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHarvests();
  }, []);

  if (loading) return <div>Carregando dados...</div>;

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

          {harvests.map((harvest, index) => (
          <div className={styles.tableRow} key={harvest._id}>
            <div className={styles.tableCell}>
              <input
                type="checkbox"
                className={styles.selectRecord}
                name="selected_id"
                value={harvest._id}
              />
            </div>
            <div className={styles.tableCell}>{index + 1}</div>
            <div className={styles.tableCell}>{new Date(harvest.harvestDate).toLocaleDateString("pt-BR")}</div>
            <div className={styles.tableCell}>{harvest.harvestStart}</div>
            <div className={styles.tableCell}>{harvest.harvestEnd}</div>
            <div className={styles.tableCell}>{harvest.harvestDuration}</div>
            <div className={styles.tableCell}>{harvest.harvestedQuantity}kg</div>
            <div className={styles.tableCell}>{harvest.planting?.plantingName || "—"}</div>
            <div className={styles.tableCell}>{harvest.quality}/10</div>
          </div>
          ))}
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
