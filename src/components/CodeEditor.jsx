import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { sql } from '@codemirror/lang-sql';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

const LANG_MAP = {
  javascript: javascript,
  java: java,
  sql: sql,
  html: html,
  css: css,
};

export default function CodeEditor({ code, language = 'java', onChange, readOnly = false }) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const langExt = LANG_MAP[language] ? LANG_MAP[language]() : javascript();

    const extensions = [
      basicSetup,
      langExt,
      oneDark,
      EditorView.lineWrapping,
    ];

    if (onChange) {
      extensions.push(
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        })
      );
    }

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    const view = new EditorView({
      doc: code || '',
      extensions,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [language]); // Re-create when language changes

  // Update content when code prop changes (without re-creating editor)
  useEffect(() => {
    if (viewRef.current && code !== undefined) {
      const currentDoc = viewRef.current.state.doc.toString();
      if (currentDoc !== code) {
        viewRef.current.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: code },
        });
      }
    }
  }, [code]);

  return <div className="editor-wrapper" ref={containerRef} />;
}
