"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IHarvest } from "@/types/Harvest";
import api from "@/services/api";
import styles from "./Reports.module.css";

const Reports = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [harvests, setHarvests] = useState<IHarvest[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um registro para excluir.");
      return;
    }

    if (!confirm("Deseja realmente excluir os registros selecionados?")) return;

    try {
      await api.delete("/harvest", {
        data: { ids: selectedIds },
      });

      // Atualiza a lista após excluir
      setHarvests((prev) => prev.filter((h) => !selectedIds.includes(h._id)));
      setSelectedIds([]);

      alert("Registros excluídos com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir registros:", error);
      alert("Erro ao excluir registros.");
    }
  };

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const res = await api.get(`/harvest/paginated?page=${page}&limit=10`);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setHarvests(res.data.harvests);
      } catch (error) {
        console.error("Erro ao buscar harvests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHarvests();
  }, [page]);

  if (loading) return <div>Carregando dados...</div>;

  return (
    <>
      {/* Botões */}
      <div className={styles.buttonContainer}>
        <button className="btn btn-primary">Criar Registro</button>
        <button className="btn btn-primary" onClick={handleDelete}>
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
                  onChange={(e) => handleSelect(harvest._id, e.target.checked)}
                />
              </div>
              <div className={styles.tableCell}>{index + 1}</div>
              <div className={styles.tableCell}>
                {new Date(harvest.harvestDate).toLocaleDateString("pt-BR")}
              </div>
              <div className={styles.tableCell}>{harvest.harvestStart}</div>
              <div className={styles.tableCell}>{harvest.harvestEnd}</div>
              <div className={styles.tableCell}>{harvest.harvestDuration}</div>
              <div className={styles.tableCell}>
                {harvest.harvestedQuantity}kg
              </div>
              <div className={styles.tableCell}>
                {harvest.planting?.plantingName || "—"}
              </div>
              <div className={styles.tableCell}>{harvest.quality}/10</div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?page=${p}`}
              className={p === currentPage ? styles.active : styles.pageLink}
            >
              {p}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reports;
