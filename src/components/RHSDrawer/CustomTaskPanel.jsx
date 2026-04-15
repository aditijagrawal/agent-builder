import React from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import { Select, SelectItem } from '@birdeye/elemental/core/atoms/Select/index.js';
import Modal from '@birdeye/elemental/core/atoms/Modal/index.js';
import './RHSDrawer.css';

const LLM_OPTIONS = ['Fast', 'Balanced', 'Powerful'];

export default function CustomTaskPanel({
  taskName = 'Identify relevant mentions in the review',
  description = 'Extract product or service-specific feedback from the review',
  llmModel = 'Fast',
  systemPrompt = '',
  userPrompt = '',
  onClose,
  onSave,
  onChange,
  isExpandedView = false,
  onToggleExpandedView,
}) {
  if (isExpandedView) {
    const dialogOptions = {
      isOpen: true,
      onCloseModal: onToggleExpandedView,
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEsc: true,
      showCloseIcon: false,
      title: 'Custom LLM task',
    };

    return (
      <Modal dialogOptions={dialogOptions} size="extraLarge">
        <div className="rhs-drawer rhs-drawer--modal">
          <div className="rhs-drawer__header">
            <div>
              <span className="rhs-drawer__header-title">Custom LLM task</span>
            </div>
            <div className="rhs-drawer__header-actions">
              <button className="rhs-drawer__icon-btn">
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
              <button
                className="rhs-drawer__icon-btn"
                onClick={onToggleExpandedView}
                aria-label="Collapse task modal"
              >
                <span className="material-symbols-outlined">close_fullscreen</span>
              </button>
              <button className="rhs-drawer__icon-btn" onClick={onClose}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="rhs-drawer__body rhs-drawer__body--modal">
            <div className="rhs-drawer__column">
              <div className="rhs-drawer__field">
                <FormInput
                  name="taskName"
                  type="text"
                  label="Task name *"
                  value={taskName}
                  placeholder="Enter task name"
                  onChange={(e, value) => onChange?.('taskName', value)}
                />
              </div>

              <div className="rhs-drawer__textarea">
                <label>
                  Description<span className="rhs-drawer__required"> *</span>
                </label>
                <textarea
                  value={description}
                  placeholder="Enter description"
                  onChange={(e) => onChange?.('description', e.target.value)}
                />
              </div>

              <div className="rhs-drawer__section">
                <div className="rhs-drawer__section-label">
                  LLM Model
                  <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
                </div>
                <div className="rhs-drawer__stacked-select">
                  <Select
                    value={llmModel}
                    onChange={(e, val) => onChange?.('llmModel', val)}
                    placeHolder="Select model"
                    variant="outlined"
                  >
                    {LLM_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="rhs-drawer__section">
                <div className="rhs-drawer__section-label">
                  Context
                  <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
                </div>
                <div className="rhs-drawer__add-card">
                  <button className="rhs-drawer__add-inline-btn">
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="rhs-drawer__section">
                <div className="rhs-drawer__section-label">
                  Input fields
                  <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
                </div>
                <div className="rhs-drawer__add-card">
                  <button className="rhs-drawer__add-inline-btn">
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="rhs-drawer__section">
                <div className="rhs-drawer__section-label">
                  System prompt<span className="rhs-drawer__required"> *</span>
                </div>
                <div className="rhs-drawer__prompt-box">
                  <textarea
                    className="rhs-drawer__prompt-textarea"
                    value={systemPrompt}
                    placeholder="Enter system prompt"
                    onChange={(e) => onChange?.('systemPrompt', e.target.value)}
                  />
                  <div className="rhs-drawer__prompt-toolbar">
                    <button className="rhs-drawer__prompt-tool-btn" title="Insert variable">
                      <span>{'{x}'}</span>
                    </button>
                    <button className="rhs-drawer__prompt-tool-btn" title="Insert template">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                    <div className="rhs-drawer__prompt-toolbar-spacer" />
                    <button className="rhs-drawer__prompt-tool-btn" title="Expand">
                      <span className="material-symbols-outlined">open_in_full</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="rhs-drawer__section">
                <div className="rhs-drawer__section-label">
                  User prompt<span className="rhs-drawer__required"> *</span>
                </div>
                <div className="rhs-drawer__prompt-box">
                  <textarea
                    className="rhs-drawer__prompt-textarea"
                    value={userPrompt}
                    placeholder="Enter user prompt"
                    onChange={(e) => onChange?.('userPrompt', e.target.value)}
                  />
                  <div className="rhs-drawer__prompt-toolbar">
                    <button className="rhs-drawer__prompt-tool-btn" title="Insert variable">
                      <span>{'{x}'}</span>
                    </button>
                    <button className="rhs-drawer__prompt-tool-btn" title="AI assist">
                      <span className="material-symbols-outlined">auto_awesome</span>
                    </button>
                    <button className="rhs-drawer__prompt-tool-btn" title="Insert template">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                    <div className="rhs-drawer__prompt-toolbar-spacer" />
                    <button className="rhs-drawer__prompt-tool-btn" title="Expand">
                      <span className="material-symbols-outlined">open_in_full</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="rhs-drawer__section">
                <div className="rhs-drawer__section-label">
                  Output fields
                  <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
                </div>
                <div className="rhs-drawer__add-card">
                  <button className="rhs-drawer__add-inline-btn">
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Add</span>
                  </button>
                  <button className="rhs-drawer__generate-btn">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    <span>Generate from prompt</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="rhs-drawer__column">
              <div className="rhs-drawer__section rhs-drawer__section--card">
                <div className="rhs-drawer__section-label">Preview</div>
                <div className="rhs-drawer__preview">
                  Input preview appears here based on selected variables and prompt context.
                </div>
              </div>
              <div className="rhs-drawer__section rhs-drawer__section--card">
                <div className="rhs-drawer__section-label">Feedback</div>
                <ul className="rhs-drawer__feedback-list">
                  <li>Use explicit tone and role constraints.</li>
                  <li>Specify exact output schema for better consistency.</li>
                  <li>Add fallback behavior for missing fields.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rhs-drawer__footer rhs-drawer__footer--modal">
            <div className="rhs-drawer__prompt-strength">
              <div className="rhs-drawer__prompt-strength-row">
                <span className="rhs-drawer__prompt-strength-label">Prompt strength:</span>
                <span className="rhs-drawer__prompt-strength-value rhs-drawer__prompt-strength-value--weak">Weak</span>
                <div className="rhs-drawer__prompt-strength-spacer" />
                <button className="rhs-drawer__prompt-strength-link">View suggestions</button>
              </div>
              <div className="rhs-drawer__prompt-strength-bar">
                <div className="rhs-drawer__prompt-strength-fill rhs-drawer__prompt-strength-fill--weak" />
              </div>
            </div>
            <div className="rhs-drawer__footer-actions">
              <Button theme="link" label="Cancel" onClick={onToggleExpandedView} />
              <Button theme="primary" label="Save" onClick={onSave} />
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <div className={`rhs-drawer ${isExpandedView ? 'rhs-drawer--expanded' : ''}`}>
      <div className="rhs-drawer__header">
        <span className="rhs-drawer__header-title">Task</span>
        <div className="rhs-drawer__header-actions">
          <button className="rhs-drawer__icon-btn">
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
          <button
            className="rhs-drawer__icon-btn"
            onClick={onToggleExpandedView}
            aria-label={isExpandedView ? 'Collapse task panel' : 'Expand task panel'}
          >
            <span className="material-symbols-outlined">
              {isExpandedView ? 'close_fullscreen' : 'open_in_full'}
            </span>
          </button>
          <button className="rhs-drawer__icon-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <div className="rhs-drawer__body">
        <div className="rhs-drawer__field">
          <FormInput
            name="taskName"
            type="text"
            label="Task name *"
            value={taskName}
            placeholder="Enter task name"
            onChange={(e, value) => onChange?.('taskName', value)}
          />
        </div>

        <div className="rhs-drawer__textarea">
          <label>
            Description<span className="rhs-drawer__required"> *</span>
          </label>
          <textarea
            value={description}
            placeholder="Enter description"
            onChange={(e) => onChange?.('description', e.target.value)}
          />
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">
            LLM Model
            <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
          </div>
          <div className="rhs-drawer__stacked-select">
            <Select
              value={llmModel}
              onChange={(e, val) => onChange?.('llmModel', val)}
              placeHolder="Select model"
              variant="outlined"
            >
              {LLM_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">
            Context
            <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
          </div>
          <div className="rhs-drawer__add-card">
            <button className="rhs-drawer__add-inline-btn">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">
            Input fields
            <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
          </div>
          <div className="rhs-drawer__add-card">
            <button className="rhs-drawer__add-inline-btn">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">
            System prompt<span className="rhs-drawer__required"> *</span>
          </div>
          <div className="rhs-drawer__prompt-box">
            <textarea
              className="rhs-drawer__prompt-textarea"
              value={systemPrompt}
              placeholder="Enter prompt"
              onChange={(e) => onChange?.('systemPrompt', e.target.value)}
            />
            <div className="rhs-drawer__prompt-toolbar">
              <button className="rhs-drawer__prompt-tool-btn" title="Insert variable">
                <span>{'{x}'}</span>
              </button>
              <button className="rhs-drawer__prompt-tool-btn" title="Insert template">
                <span className="material-symbols-outlined">content_copy</span>
              </button>
              <div className="rhs-drawer__prompt-toolbar-spacer" />
              <button className="rhs-drawer__prompt-tool-btn" title="Expand">
                <span className="material-symbols-outlined">open_in_full</span>
              </button>
            </div>
          </div>
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">
            User prompt<span className="rhs-drawer__required"> *</span>
          </div>
          <div className="rhs-drawer__prompt-box">
            <textarea
              className="rhs-drawer__prompt-textarea"
              value={userPrompt}
              placeholder="Enter prompt"
              onChange={(e) => onChange?.('userPrompt', e.target.value)}
            />
            <div className="rhs-drawer__prompt-toolbar">
              <button className="rhs-drawer__prompt-tool-btn" title="Insert variable">
                <span>{'{x}'}</span>
              </button>
              <button className="rhs-drawer__prompt-tool-btn" title="AI assist">
                <span className="material-symbols-outlined">auto_awesome</span>
              </button>
              <button className="rhs-drawer__prompt-tool-btn" title="Insert template">
                <span className="material-symbols-outlined">content_copy</span>
              </button>
              <div className="rhs-drawer__prompt-toolbar-spacer" />
              <button className="rhs-drawer__prompt-tool-btn" title="Expand">
                <span className="material-symbols-outlined">open_in_full</span>
              </button>
            </div>
          </div>
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">
            Output fields
            <span className="material-symbols-outlined rhs-drawer__info-icon">info</span>
          </div>
          <div className="rhs-drawer__add-card">
            <button className="rhs-drawer__add-inline-btn">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add</span>
            </button>
            <button className="rhs-drawer__generate-btn">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>Generate from prompt</span>
            </button>
          </div>
        </div>

        <div className="rhs-drawer__prompt-strength">
          <div className="rhs-drawer__prompt-strength-row">
            <span className="rhs-drawer__prompt-strength-label">Prompt strength:</span>
            <span className="rhs-drawer__prompt-strength-value rhs-drawer__prompt-strength-value--weak">Weak</span>
            <div className="rhs-drawer__prompt-strength-spacer" />
            <button className="rhs-drawer__prompt-strength-link">View suggestions</button>
          </div>
          <div className="rhs-drawer__prompt-strength-bar">
            <div className="rhs-drawer__prompt-strength-fill rhs-drawer__prompt-strength-fill--weak" />
          </div>
        </div>
      </div>

      <div className="rhs-drawer__footer">
        <Button theme="primary" label="Save" onClick={onSave} />
      </div>
    </div>
  );
}
