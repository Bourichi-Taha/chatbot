import { DataGrid } from '@mui/x-data-grid';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useFetchLibraryQuery } from '../features/Library/LibraryApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentIsFiltered, selectCurrentLibraryFiltered } from '../features/Library/LibrarySlice';
import { useNavigate } from 'react-router-dom';

export default function CustomDataGrid() {

  const { data, isLoading, isSuccess } = useFetchLibraryQuery();
  const isFiltered = useSelector(selectCurrentIsFiltered);
  const filteredLibrary = useSelector(selectCurrentLibraryFiltered);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate()
  const columns = [
    { field: "project_name", headerName: "Project name", width: 150, hide: true },
    { field: "werkinhood", headerName: "Werkinhoud", width: 150, hide: true },
    { field: "client", headerName: "Client", width: 150, hide: true },
    { field: "timestamp", headerName: "Created date", width: 150, hide: true },
    // { field: "status",headerName:"Status",width:150, hide: true },
    // { field: "category",headerName:"Category",width:150, hide: true },
    // { field: "contract_type",headerName:"Contract type",width:150, hide: true },
    {
      field: "files", headerName: "File", width: 50, hide: true, renderCell: (params) => (
        <div style={{ display: 'flex' }}>
          {
            params?.value?.map((file, index) => {
              return (
                <IconButton key={index} href={file.uploaded_file} target="_blank" >
                  <AttachFileOutlinedIcon />
                </IconButton>
              )
            })
          }
        </div>
      ),
    },
  ]
  useEffect(() => {
    let arr = [];
    if (data?.length !== 0 && isSuccess) {
      (data)?.map((p) => {
        const obj = {
          ...p,
          id: p.project_id,
          timestamp: p.timestamp.split('T')[0],
        }
        return arr.push(obj);
      });
      setProjects(arr)
    }
  }, [isLoading, data, isSuccess])
  useEffect(() => {

    let arr = [];
    if (isFiltered) {
      (filteredLibrary)?.map((p) => {
        const obj = {
          ...p,
          id: p.project_id,
          timestamp: p.timestamp.split('T')[0],
        }
        return arr.push(obj);
      });
    }else{
      (data)?.map((p) => {
        const obj = {
          ...p,
          id: p.project_id,
          timestamp: p.timestamp.split('T')[0],
        }
        return arr.push(obj);
      });
    }
    setProjects(arr)
  }, [isFiltered,filteredLibrary]);
  const handleCellClick = (params) => {
    navigate(`/projects/${params.id}`)
  }
  return (
    <div style={{ width: '100%', height: "100%", display: 'flex', alignItems: "center", justifyContent: "center" }}>
      <div style={{ height: "100%", width: '100%' }}>
        <DataGrid
          sx={{ border: "none" }}
          // {...data}
          columns={columns}
          rows={projects}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
          onCellClick={handleCellClick}
        />
      </div>
    </div>
  );
}