import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

const LANGS = { python, java };

export default function CodeEditor({ code, language = 'python', onChange }) {
  const hostRef = useRef(null);
  const viewRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const view = new EditorView({
      doc: code || '',
      parent: hostRef.current,
      extensions: [
        basicSetup,
        (LANGS[language] || python)(),
        oneDark,
        EditorView.updateListener.of((u) => {
          if (u.docChanged) onChangeRef.current?.(u.state.doc.toString());
        }),
      ],
    });
    viewRef.current = view;
    return () => view.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || code === undefined) return;
    const current = view.state.doc.toString();
    if (current !== code) view.dispatch({ changes: { from: 0, to: current.length, insert: code } });
  }, [code]);

  return <div className="editor-host" ref={hostRef} />;
}
