import useSWR from 'swr'
import { tableFeatures, useTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

type Game = {
    id: number,
    name: string,
    genres: number[],
    rating: number,
    number_of_ratings: number
}

const features = tableFeatures({})

const columns: Array<ColumnDef<typeof features, Game>> = [
    {
        accessorKey: 'name',
        header: () => 'Title',
    },
    {
        accessorKey: 'genres',
        header: () => 'Genres',
    },
    {
        accessorKey: 'rating',
        header: () => 'Rating',
        cell: (info) => {
            const value = info.getValue() as number
            return value ? Math.round(value) : 50
        },
    },
    {
        accessorKey: 'number_of_ratings',
        header: () => 'Number of ratings',
    }
]

function Top20list() {
    const { data, error, isLoading } = useSWR('/top20games');

    const games = data?.data || []

    const table = useTable({
        features,
        columns,
        data: games,
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load</div>;


    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-orange-100 uppercase bg-sky-800">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} scope="col" className="px-6 py-3">
                                {header.isPlaceholder ? null : (
                                    <table.FlexRender header={header} />
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr
                        key={row.id}
                        className="bg-sky-300 border-b hover:bg-sky-400 transition-colors duration-200"
                    >
                        {row.getAllCells().map((cell) => (
                            <td key={cell.id} className="px-6 py-4 font-medium text-gray-900">
                                <table.FlexRender cell={cell} />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Top20list