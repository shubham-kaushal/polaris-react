import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import type {Error} from '../../types';
import {InlineError} from '../InlineError';

import styles from './Choice.scss';

export type Alignment = 'leading' | 'trailing' | 'center';

export interface ChoiceProps {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label: React.ReactNode;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Display an error message */
  error?: Error | boolean;
  /** Visually hide the label */
  labelHidden?: boolean;
  /**  Content to display inside the choice */
  children?: React.ReactNode;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Adjust vertical alignment of choice and label. Defaults to leading */
  alignment?: Alignment;
  /** Stretch choice to fill the width of its container */
  fullWidth?: boolean;
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when mouse over */
  onMouseOver?(): void;
  /** Callback when mouse out */
  onMouseOut?(): void;
}

export function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
  alignment,
  fullWidth,
  onClick,
  onMouseOut,
  onMouseOver,
}: ChoiceProps) {
  const className = classNames(
    styles.Choice,
    labelHidden && styles.labelHidden,
    disabled && styles.disabled,
    alignment && styles[variationName('alignment', alignment)],
    fullWidth && styles.fullWidth,
  );

  const labelClassNames = classNames(
    styles.Label,
    fullWidth && styles.fullWidth,
  );

  const labelMarkup = (
    <label
      className={className}
      htmlFor={id}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <span className={styles.Control}>{children}</span>
      <span className={labelClassNames}>{label}</span>
    </label>
  );

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={helpTextID(id)}>
      {helpText}
    </div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div className={styles.Error}>
      <InlineError message={error} fieldID={id} />
    </div>
  );

  const descriptionMarkup =
    helpTextMarkup || errorMarkup ? (
      <div className={styles.Descriptions}>
        {errorMarkup}
        {helpTextMarkup}
      </div>
    ) : null;

  return descriptionMarkup ? (
    <div>
      {labelMarkup}
      {descriptionMarkup}
    </div>
  ) : (
    labelMarkup
  );
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}
