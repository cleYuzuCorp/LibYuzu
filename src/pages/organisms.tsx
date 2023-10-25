import THeader from "../components/templates/Header/t-header"
import { Card, CardHeader, Checkbox, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, ThemeProvider } from "@mui/material"
import theme from "../theme/theme"
import AButton from "../components/atoms/Button/a-button"
import { useState } from "react"
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions"

const Organisms = () => {

    function not(a: readonly number[], b: readonly number[]) {
        return a.filter((value) => b.indexOf(value) === -1)
    }

    function intersection(a: readonly number[], b: readonly number[]) {
        return a.filter((value) => b.indexOf(value) !== -1)
    }

    function union(a: readonly number[], b: readonly number[]) {
        return [...a, ...not(b, a)]
    }

    const [checked, setChecked] = useState<readonly number[]>([])
    const [left, setLeft] = useState<readonly number[]>([0, 1, 2, 3])
    const [right, setRight] = useState<readonly number[]>([4, 5, 6, 7])

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const numberOfChecked = (items: readonly number[]) =>
        intersection(checked, items).length

    const handleToggleAll = (items: readonly number[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items))
        } else {
            setChecked(union(checked, items))
        }
    }

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    function createData(name: string, calories: number, fat: number) {
        return { name, calories, fat }
    }

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const rows = [
        createData('Cupcake', 305, 3.7),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375, 0.0),
        createData('KitKat', 518, 26.0),
        createData('Lollipop', 392, 0.2),
        createData('Marshmallow', 318, 0),
        createData('Nougat', 360, 19.0),
        createData('Oreo', 437, 18.0),
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1))

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const customList = (title: React.ReactNode, items: readonly number[]) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: number) => {
                    const labelId = `transfer-list-all-item-${value}-label`

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`List item ${value + 1}`} />
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                <THeader />
                <Stack spacing={12} alignItems="center" marginTop="150px" marginBottom="150px">
                    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Stack>{customList('Choices', left)}</Stack>
                        <Stack>
                            <Stack spacing={1} direction="column" alignItems="center">
                                <AButton
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                >
                                    {">"}
                                </AButton>
                                <AButton
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                >
                                    {"<"}
                                </AButton>
                            </Stack>
                        </Stack>
                        <Stack>{customList('Chosen', right)}</Stack>
                    </Stack>

                    <TableContainer sx={{ border: '1px solid', borderRadius: '10px', borderColor: theme.palette.background.paper }}>
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            {row.calories}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            {row.fat}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Organisms