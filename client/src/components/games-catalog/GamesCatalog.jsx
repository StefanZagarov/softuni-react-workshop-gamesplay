import GameCatalogItem from "./game-catalog-item/GameCatalogItem";
import { useGetAllGames } from "../../api/gameApi";

export default function GamesCatalog() {
    const games = useGetAllGames();

    return (
        < section id="catalog-page" >
            <h1>All Games</h1>

            {/* We destructure the game data here to make it easier to use in the GameCatalogItem component */}
            {games.length > 0 ?
                games.map(game => <GameCatalogItem key={game._id} {...game} />)
                : <h3 className="no-articles">No articles yet</h3>}

        </section >
    );
}
