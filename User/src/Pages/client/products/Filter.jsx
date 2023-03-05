import { Box, Button, Divider, InputBase, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import brandService from '../../../services/brand.service';
import categoryService from '../../../services/category.service';

import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Filter = ({ filter, setFilter, runFilter }) => {

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        categoryService.getAllCategories().then((res) => {
            setCategories(res.categories)
            setLoading(false)
        })
            .catch((err) => {
                console.log(err)
                setLoading(true)
            })

        brandService.getAllBrands().then((res) => {
            setBrands(res.brands)
            setLoading(false)
        })
            .catch((err) => {
                console.log(err)
                setLoading(true)
            })

    }, [])




    return (
        loading ? <h1>Loading...</h1> :
            <Box sx={{ minHeight: "50vh", borderRadius: 3, boxShadow: 3, mx: "auto", maxWidth: 350, overflowY: "auto" }}>
                <Typography variant='overline' fontSize={16} sx={{ px: 1 }}>
                    Chercher dans les bouquins
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Box className="categories" sx={{ textAlign: "left", px: 2 }}>
                    <Typography variant='overline' fontSize={16} textAlign="left" >
                        Catégories
                    </Typography>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                    >
                        <TreeItem nodeId="1" label="Catégories">
                            <TreeItem nodeId={'999'} label={"All"} onClick={() => { setFilter({ ...filter, category: "" }) }} />
                            {
                                categories.map((category, index) => (
                                    <TreeItem nodeId={(index + 2).toString()} label={category.name} key={category._id} onClick={() => { setFilter({ ...filter, category: category._id }) }} />
                                ))

                            }
                        </TreeItem>
                    </TreeView>
                </Box>
                <Box className="categories" sx={{ textAlign: "left", px: 2 }}>
                    <Typography variant='overline' fontSize={16} textAlign="left">
                        Authors
                    </Typography>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                    >
                        <TreeItem nodeId="1" label="Authors">
                            <TreeItem nodeId={'888'} label={"All"} onClick={() => { setFilter({ ...filter, brand: "" }) }} />

                            {
                                brands.map((brand, index) => (
                                    <TreeItem nodeId={(index + 2).toString()} label={brand.name} key={brand._id} onClick={() => { setFilter({ ...filter, brand: brand._id }) }} />
                                ))

                            }
                        </TreeItem>
                    </TreeView>
                </Box>

                <Box className="categories" sx={{ textAlign: "left", px: 2 }}>
                    <Typography variant='overline' fontSize={16} textAlign="left">
                        Prix en DH
                    </Typography>

                    <Box sx={{ width: 200, my: 1, height: 50, display: "flex", alignItems: 'center', justifyContent: "flex-start", mr: "auto" }}>
                        <Typography variant='body2' fontSize={16} textAlign="left" sx={{ ml: 1 }}>
                            Min:
                        </Typography>
                        <InputBase
                            sx={{ ml: 3, mr: 1, width: "100%", flex: 1, }}
                            placeholder="Prix min"
                            inputProps={{ 'aria-label': 'Chercher un produit', min: 0, max: 99999 }}
                            type="number"
                            value={filter.priceMin}
                            onChange={(e) => setFilter({ ...filter, priceMin: e.target.value })}
                        />

                    </Box>
                    <Box sx={{ width: 200, mb: 1, height: 50, display: "flex", alignItems: 'center', justifyContent: "flex-start", mr: "auto" }}>
                        <Typography variant='body2' fontSize={16} textAlign="left" sx={{ ml: 1 }}>
                            Max:
                        </Typography>
                        <InputBase
                            sx={{ ml: 3, mr: 1, width: "100%", flex: 1, }}
                            placeholder="Prix min"
                            inputProps={{ 'aria-label': 'Chercher un produit', min: 0, max: 99999 }}
                            type="number"
                            value={filter.priceMax}
                            onChange={(e) => setFilter({ ...filter, priceMax: e.target.value })}
                        />

                    </Box>
                    <Box sx={{ width: 200, mb: 2, height: 100, display: "flex", alignItems: 'flex-end', justifyContent: "center", mx: "auto" }}>
                        <Button variant="contained" sx={{ width: "100%", flex: 1, }} onClick={runFilter}>
                            Appliquer
                        </Button>
                    </Box>
                </Box>
            </Box>
    )
}

export default Filter;