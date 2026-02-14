# AGENTS Guide: gw2-markup

## Big picture (monorepo architecture)
- This is a pnpm workspace (`pnpm-workspace.yaml`) with small focused packages under `packages/*`.
- Core flow is: **markup string → AST → target output**.
  - Parse: `@gw2/markup-parser` (`packages/parser/src/parser.ts`)
  - AST types: `@gw2/markup-ast` (`packages/ast/src/ast.ts`)
  - Output adapters: low-level converters and higher-level wrappers.
- Package categories to preserve as the repo grows:
  - **Special core packages**: `parser`, `ast`, `unified` (stable integration boundaries).
  - **Low-level converters**: packages that transform AST to a target (`stringify`, `to-text`, `to-hast`, `to-jsx`, future `to-*` like `to-mdast`, `to-ansi`, ...).
  - **High-level wrappers**: runtime/framework-oriented APIs that compose parser + converter(s) (`react`, `strip`, …).
  - **Utility packages**: shared utilities that don't fit the above but are used across multiple packages (e.g. `css` providing common stylesheets that can be used with the different runtime packages).

## Markup structure and parser behavior
- Plain text is valid input; markup can appear inline between text segments.
- Color spans use `<c=...>...</c>`:
  - named color example: `before<c=@test>content</c>after`
  - hex color example: `before<c=#bada55>content</c>after`
- Breaks are represented either as literal newlines (`\n`) or `<br>` / `<br/>`.
- Nested color spans are valid: `before<c=@test1>x<c=@test2>y</c>z</c>after`.
- AST node types are only `root`, `text`, `break`, `color` (`packages/ast/src/ast.ts`).
- Parser is intentionally tolerant (`packages/parser/src/parser.ts`) (do not “tighten” this without updating snapshots):
  - Non-string input becomes empty string.
  - malformed open/close tags are treated gracefully (`<c@test>`, `<c>`, `<c/>`)
  - unknown tags are preserved as text (`<unknown>...`)
  - Unclosed color tags are auto-closed at EOF.
- Positions are first-class (`line`, `column`, `offset`) via cursor utilities in `packages/parser/src/cursor.ts`.
- Adjacent text is coalesced into a single `text` node.

## Output package patterns
- Low-level AST converters should stay deterministic and side-effect free (`stringify`, `to-text`, `to-hast`, `to-jsx`, future `to-*`).
- Composition wrappers (like `strip` or framework packages) should mostly wire existing blocks together (`parseGw2Markup(input)` + converter call).
- `to-jsx` is renderer-agnostic: caller provides `createElement` + component mapping.
- Framework packages (current `react`, future `solid`/`vue`/…) should wrap low-level converters with runtime defaults.

## Unified integration boundary
- The `unified` package provides unified plugins for the different converters.

## Testing and workflows
- Install deps: `pnpm i`. Always do this after modifying `package.json` files.
- Build all packages: `pnpm build`
- Run all tests: `pnpm test`
- Update snapshots: `pnpm test -- -u`
- For user-facing changes, add a changeset for all affected packages.
- Per-package workflow uses pnpm filtering, e.g. `pnpm -F @gw2/markup-react test`.
- Snapshot tests are shared-data driven: `tests.json` powers underlying test suites.

## Project-specific conventions
- Keep packages small and composable; prefer adding behavior in low-level packages and reusing in high-level wrappers.
- Keep parsing/stringifying deterministic; many tests assert exact snapshot output formatting.
- Preserve ESM style and explicit `.ts`/`.js` import suffixes used throughout source.
- When changing parser semantics, update downstream snapshot suites together.
