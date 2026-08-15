import useSWR from 'swr'

function Top20list() {
    const { data, error, isLoading } = useSWR('/top20games');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load</div>;

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default Top20list