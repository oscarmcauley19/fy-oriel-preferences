import { useCallback, useEffect, useState } from "react";
import update from 'immutability-helper';
import { DraggableCard } from "./DraggableCard";
import { getOptions } from "../lib/rankingOptions";

const style = {
}

export interface Item {
    id: number
    name: string
    ratio: number
}

export interface ContainerState {
    cards: Item[]
}

export default function SortableList() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        getOptions().then(setCards);
    }, []);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: Item[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            }),
        )
    }, [])

    const renderCard = useCallback(
        (card: { id: number; name: string, ratio: number }, index: number) => {
            return (
                <DraggableCard
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.name}
                    ratio={card.ratio}
                    moveCard={moveCard}
                />
            )
        },
        [],
    )

    return (
        <>
            <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </>
    )
}