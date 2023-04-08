import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoCondition } from '../../types/TodoCondition';

type Props = {
  todo: Todo,
  todoCondition: TodoCondition,
  onDeleteTodo?: (todoId: number) => void,
  onTodoCheck?: (todo: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todoCondition,
  onDeleteTodo = () => {},
  onTodoCheck = () => {},
}) => {
  const { id, title, completed } = todo;

  return (
    <div className={classNames(
      'todo',
      { completed },
    )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onTodoCheck(todo)}
        />
      </label>

      {todoCondition === TodoCondition.editing
        ? (
          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value="Todo is being edited now"
            />
          </form>
        )
        : (
          <>
            <span className="todo__title">{title}</span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
              onClick={() => onDeleteTodo(id)}
            >
              ×
            </button>
          </>
        )}

      <div className={classNames(
        'modal',
        'overlay',
        { 'is-active': todoCondition !== TodoCondition.neutral },
      )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};