"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";

export const Products: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const modal = searchParams.get("modal");
  const pageQuery = searchParams.get("page");

  const initialPage = pageQuery ? parseInt(pageQuery, 10) : 1;

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({
    items: PRODUCTS_DATA,
    itemsPerPage: 5,
    initialPage,
  });

  const handleOpenModal = (product: Product) => {
    router.push(`/products?modal=${product.id}&page=${currentPage}`);
  };

  const handleCloseModal = () => {
    router.push(`/products?page=${currentPage}`);
  };

  const handlePagination = (direction: "next" | "prev") => {
    handlePageChange(direction);
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    router.push(`/products?page=${newPage}`);
  };

  useEffect(() => {
    if (modal) {
      const product = PRODUCTS_DATA.find((item) => item.id === modal);
      if (product) {
        handleOpenModal(product);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePagination}
      />
      {modal && (
        <ProductModal
          product={PRODUCTS_DATA.find((item) => item.id === modal)!}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
