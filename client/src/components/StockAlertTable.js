
// This component is used to display the stock alert table in the Vendor Dashboard

import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { field: 'pid', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: 'Product Name', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'quantity', headerName: 'Quantity', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'threshold', headerName: 'Threshold Value', width: 200, align: 'center', headerAlign: 'center' },
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
            <GridToolbarDensitySelector />
            <IconButton color="primary" aria-label="delete selected rows" component="span">
                <DeleteIcon />
            </IconButton>
        </GridToolbarContainer>
    );
}

export default function StockAlertTable(props) {
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleSelection = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    };

    return (
        <div style={{ height: "100%", width: '100%' }}>
            <DataGrid
                rows={props.data}
                columns={columns}
                components={{
                    Toolbar: CustomToolbar,
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                onSelectionModelChange={handleSelection}
                selectionModel={selectionModel}
                pagination
                pageSize={5}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
