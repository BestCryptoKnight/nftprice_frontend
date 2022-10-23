import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { numFormatter, numberWithCommas } from "../../utils/customFunctions";
import { useRouter } from "next/router";


function descendingComparator(a, b, orderBy) {

    let t1 = a[orderBy];
    let t2 = b[orderBy];
    if (Number(a[orderBy])) {
        t1 = Number(t1);
        t2 = Number(t2);
    }
    if (t2 < t1) {
        return -1;
    }
    if (t2 > t1) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => {
        return [el, index]
    });

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'numInd',
        numeric: true,
        disablePadding: true,
        label: '#',
    },
    {
        id: 'collectible',
        numeric: false,
        disablePadding: false,
        label: 'Collectible',
    },
    {
        id: 'priceFloor',
        numeric: true,
        disablePadding: false,
        label: 'Price Floor',
    },
    {
        id: 'day',
        numeric: true,
        disablePadding: false,
        label: '24h%',
    },
    {
        id: 'volume',
        numeric: true,
        disablePadding: false,
        label: 'volume(24h)',
    },
    {
        id: 'sales',
        numeric: true,
        disablePadding: false,
        label: 'sales(24h)',
    },
    {
        id: 'suplyRatio',
        numeric: true,
        disablePadding: false,
        label: 'Listed/Supply Ratio',
    },
    {
        id: 'marketCap',
        numeric: true,
        disablePadding: false,
        label: 'Market Cap',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, time } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead >
            <TableRow>
                {headCells.map((headCell) => {
                    let cell = headCell;
                    if (headCell.id === 'day') {
                        cell.label = ((time == "1d") ? '24h' : time) + '(%)';
                    } else if (headCell.id === 'volume' || headCell.id === 'sales') {
                        cell.label = headCell.id + '(' + ((time == "1d") ? '24h' : time) + ')';
                    }
                    return (
                        <TableCell
                            key={headCell.id}
                            // align={headCell.numeric ? 'right' : 'left'}
                            align={'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{ 'color': '#00a249' }}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                &nbsp;&nbsp;{headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
};



export default function EnhancedTable(props) {
    const { topCollections, time, payUnite, etherPrice } = props;
    console.log("topCollections")
    console.log(topCollections)
    var tokens = [];
    topCollections.map((topCollection, index) => {
        let token = new Object();
        token.numInd = (index + 1)
        token.collectible = topCollection.data.name;
        if (payUnite) {
            token.priceFloor = (topCollection.data.stats.floor_price) ? topCollection.data.stats.floor_price : 0;
            token.priceFloor_ = (topCollection.data.stats.floor_price) ? numFormatter(topCollection.data.stats.floor_price) : 0;
        } else {
            token.priceFloor = (topCollection.data.stats.floor_price) ? (topCollection.data.stats.floor_price) * etherPrice : 0;
            token.priceFloor_ = (topCollection.data.stats.floor_price) ? numFormatter((topCollection.data.stats.floor_price) * etherPrice) : 0;
        }
        token.image = topCollection.data.image_url;
        token.slug = topCollection.data.slug;
        if (time == "7d") {
            token.day = (topCollection.data.stats.seven_day_change * 100).toFixed(2);
            token.sales = (topCollection.data.stats.seven_day_sales).toFixed(2);
            if (payUnite) {
                token.volume = topCollection.data.stats.seven_day_volume;
                token.volume_ = numFormatter(topCollection.data.stats.seven_day_volume);
            } else {
                token.volume = topCollection.data.stats.seven_day_volume * etherPrice;
                token.volume_ = numFormatter(topCollection.data.stats.seven_day_volume * etherPrice);
            }
        } else if (time == "30d") {
            token.day = (topCollection.data.stats.thirty_day_change * 100).toFixed(2);
            token.sales = (topCollection.data.stats.thirty_day_sales).toFixed(2);
            if (payUnite) {
                token.volume = topCollection.data.stats.thirty_day_volume;
                token.volume_ = numFormatter(topCollection.data.stats.thirty_day_volume);
            } else {
                token.volume = topCollection.data.stats.thirty_day_volume * etherPrice;
                token.volume_ = numFormatter(topCollection.data.stats.thirty_day_volume * etherPrice);
            }
        } else {
            token.day = (topCollection.data.stats.one_day_change * 100).toFixed(2);
            token.sales = (topCollection.data.stats.one_day_sales).toFixed(2);
            if (payUnite) {
                token.volume = topCollection.data.stats.one_day_volume;
                token.volume_ = numFormatter(topCollection.data.stats.one_day_volume);
            } else {
                token.volume = topCollection.data.stats.one_day_volume * etherPrice;
                token.volume_ = numFormatter(topCollection.data.stats.one_day_volume * etherPrice);
            }
        }
        token.suplyRatio = (topCollection.data.stats.supply_ratio_pecentage).toFixed(2);
        if (payUnite) {
            token.marketCap = topCollection.data.stats.market_capture;
            token.marketCap_ = numFormatter(topCollection.data.stats.market_capture);
        } else {
            token.marketCap = topCollection.data.stats.market_capture * etherPrice;
            token.marketCap_ = numFormatter(topCollection.data.stats.market_capture * etherPrice);
        }
        tokens.push(token);

    })
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const getColor = (value) => {
        if (parseFloat(value) < 0) return "red";
        else if (parseFloat(value) > 0) return "green";
    };
    const navigateTo = (link) => {
        navigate.push(link);
    };
    const navigate = useRouter();

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tokens.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <div></div>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 600 }}
                        aria-labelledby="tableTitle"
                        size=''
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={tokens.length}
                            time={time}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 tokens.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(tokens, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((token, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={token.numInd}
                                            onClick={() => navigateTo(`/collections/${token.slug}`)}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                className=''
                                            >
                                                &nbsp;&nbsp;{token.numInd}
                                            </TableCell>
                                            <TableCell align="left" className='d-flex align-items-center '>
                                                <div className="author_list_pp">
                                                    <span onClick={() => window.open("", "_self")}>
                                                        <img className="lazy" src={token.image} alt="" />
                                                        <i className="fa fa-check"></i>
                                                    </span>
                                                </div>
                                                <div style={{
                                                    'padding': "10px 0 10px 54px",
                                                    'width': '230px'
                                                }}>
                                                    {token.collectible}
                                                </div>
                                            </TableCell>
                                            <TableCell align="left" style={{ 'padding': "10px 0 10px 28px" }} className='' ><i className={(payUnite) ? "fab fa-ethereum" : "fas fa-dollar-sign"}></i> {token.priceFloor_}</TableCell>
                                            <TableCell align="left" className=''>
                                                <span
                                                    className="top-nft-collection-card-trade"
                                                    style={{ color: getColor(token.day) }}
                                                >
                                                    {token.day >= 0 ? `+` : ``}
                                                    {parseFloat(token.day).toFixed(
                                                        2
                                                    )}
                                                    %
                                                </span>
                                                {/* {`${token.day}%`} */}
                                            </TableCell>
                                            <TableCell align="left" style={{ 'padding': "10px 0 10px 28px" }} className=''><i className={(payUnite) ? "fab fa-ethereum" : "fas fa-dollar-sign"}></i>{token.volume_}</TableCell>
                                            <TableCell align="left" style={{ 'padding': "10px 0 10px 28px" }} className=''>{token.sales}</TableCell>
                                            <TableCell align="left" style={{ 'padding': "10px 0 10px 28px" }} className=''>{token.suplyRatio}</TableCell>
                                            <TableCell align="left" style={{ 'padding': "10px 0 10px 28px" }} className=''><i className={(payUnite) ? "fab fa-ethereum" : "fas fa-dollar-sign"}></i>{token.marketCap_}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={tokens.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}
