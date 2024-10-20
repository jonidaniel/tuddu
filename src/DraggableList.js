import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const LOCAL_STORAGE_KEY = "todoApp.draggables";

export default function DraggableList(todos) {
  const [draggables, setDraggables] = useState(todos);

  // Gets draggables from local storage
  useEffect(() => {
    const storedDraggables = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (storedDraggables) setDraggables(storedDraggables);
  }, []);

  // Stores draggables into local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draggables));
  }, [draggables]);

  function handleOnDragEnd(result) {
    // If a draggable is dropped outside of area
    if (!result.destination) return;

    const items = Array.from(draggables);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDraggables(items);
  }

  return (
    <div className="draggableList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppables">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {draggables.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
