import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTable from "../../../../common/Table/HeaderTable";
import TableCommon from "../../../../common/Table/table";
import { useGetAllProduct } from "../../../../hooks/products/productHook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotiAdmin from "../../../../helper/NotiAdmin";
import { deleteProduct } from "../../../../services/adminPage/productService";
import ActionTable from "../../../../common/Table/ActionTable.js/ActionTable";
import TableCustom from "../../../../common/Table/TableCustom";
import { Box } from "@mui/system";
import FilterSearchTable from "../../../../common/Table/ActionTable.js/FilterSearchTable";
import FilterSelectTable from "../../../../common/Table/ActionTable.js/FilterSelectTable";
import { companyList, companyListAdmin } from "../../../../constant/companyList";
import { Tooltip } from "@mui/material";
import { categoryListAdmin } from "../../../../constant/categoryList";


const styleActionIcon = {
  marginRight: "1rem",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "100%",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },
};

const ProductManage = React.memo((props) => {
  console.log("hoatlaManage");
  //! State
  const { handleFullScreen } = props;
  const [filterProduct, setFilterProduct] = useState({
    name: '',
    company: '',
    category: ''
  });
  const {
    data: listProduct,
    error,
    isLoading: isLoadingProduct,
    refresh,
  } = useGetAllProduct(filterProduct);
  
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState({type: '',msg:''});

  //! Table config

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 250
    },
    {
      field: 'name',
      headerName: 'Name product',
      width: 150,
      sortable: false,
      renderHeader: (paramsHeader) => {
        return(
          <Box>
            Name product
            <FilterSearchTable handleSearch={setFilterProduct} querySearch="name" searchValue={filterProduct}/>
          </Box>
        )
      }
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      renderCell: (params) => {
        return(
          <Tooltip title={params?.value} placement="bottom">
            <div>
              {params?.value}
            </div>
          </Tooltip>
        )
      }
    },
    {
      field: 'company',
      headerName: 'Supply company',
      width: 250,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderHeader: (paramsHeader) => {
        return(
          <Box>
            Supply company
            <FilterSelectTable handleSearch={setFilterProduct} querySearch="company" searchValue={filterProduct} options={companyListAdmin}/>
          </Box>
        )
      }
    },
    {
      field: 'category',
      headerName: 'Type product',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderHeader: (paramsHeader) => {
        return(
          <Box>
            Type product
            <FilterSelectTable handleSearch={setFilterProduct} querySearch="category" searchValue={filterProduct} options={categoryListAdmin}/>
          </Box>
        )
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => `$${params?.value}`
    },
    {
      field: 'action',
      headerName: '',
      renderCell: (params) => {
        return(
          <ActionTable params={params} handleEdit={() => handleEdit(params?.id)} handleDelete={() => handleDelete(params?.id)}/>
        )
      }
    }
  ]

  //! Function
  const handleCreate = useCallback(() => {
    navigate("/admin/products/create", { replace: true });
  },[]);

  const handleEdit = useCallback((id) => {
    navigate(`/admin/products/${id}`,{replace: true})
  },[])
  

  const handleDelete = async (id) => {
      try {
          const response = await deleteProduct(id);
          if(response && response?.status===200){
            setMes({...mes, type: "success", msg: response?.data?.msg})
            setOpen(true)
            refresh && refresh();
          }
          console.log("response",response);
      } catch (error) {
          console.log('error',error);
      }
  }

  const handleRefreshData = () => {
    setFilterProduct({
      name: '',
      category: '',
      company: ''
    })
  }

  //! Render
  return (
    <div className="container-admin">
      <NotiAdmin open={open} setOpen={setOpen} mes={mes}/>
      <HeaderTable
        // filterData={filterProduct}
        // setFilterData={setFilterProduct}
        // placeholder="Product name ..."
        refresh={refresh}
        handleRefreshData={handleRefreshData}
        handleFullScreen={handleFullScreen}
        handleCreate={handleCreate}
      />
      <TableCustom rows={(listProduct || [])?.map((el) => {
        return {
          id: el?._id,
          ...el
        }
      })}
      columns={columns} isLoading={isLoadingProduct} />
    </div>
  );
})


export default ProductManage;
