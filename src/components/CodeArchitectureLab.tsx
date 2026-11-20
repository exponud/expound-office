import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Play, RotateCcw, Terminal, Braces, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/src/components/MotionPrimitives';

interface CodeLine {
  num: string;
  tokens: Array<{ text: string; tone?: 'kw' | 'fn' | 'str' | 'type' | 'cm' | 'num' | 'plain' }>;
  annotation: string;
}

interface CodeModule {
  id: string;
  filename: string;
  stack: string;
  title: string;
  summary: string;
  lines: CodeLine[];
  executionSteps: Array<{
    step: string;
    latency: string;
    detail: string;
  }>;
  outputJson: string[];
}

const CODE_MODULES: CodeModule[] = [
  {
    id: 'shopify-function',
    filename: 'tier-bundle.function.ts',
    stack: 'Shopify Functions · GraphQL',
    title: 'Edge Checkout Pricing Engine',
    summary:
      'Runs directly inside Shopify global infrastructure in sub-millisecond time to compute tiered B2B and bundle pricing without brittle Liquid cart scripts.',
    lines: [
      {
        num: '01',
        tokens: [
          { text: 'export function ', tone: 'kw' },
          { text: 'run', tone: 'fn' },
          { text: '(input: ', tone: 'plain' },
          { text: 'CartRunInput', tone: 'type' },
          { text: '): ', tone: 'plain' },
          { text: 'FunctionRunResult', tone: 'type' },
          { text: ' {', tone: 'plain' },
        ],
        annotation: 'Strongly-typed WASM entry executed natively inside Shopify Checkout.',
      },
      {
        num: '02',
        tokens: [
          { text: '  const ', tone: 'kw' },
          { text: 'b2bTier ', tone: 'plain' },
          { text: '= input.cart.buyerIdentity?.customer?.', tone: 'plain' },
          { text: 'metafield', tone: 'fn' },
          { text: '?.value;', tone: 'plain' },
        ],
        annotation: 'Reads verified wholesale tier directly from authenticated customer metafields.',
      },
      {
        num: '03',
        tokens: [
          { text: '  const ', tone: 'kw' },
          { text: 'targets ', tone: 'plain' },
          { text: '= input.cart.lines.', tone: 'plain' },
          { text: 'filter', tone: 'fn' },
          { text: '(l => l.quantity >= ', tone: 'plain' },
          { text: '5', tone: 'num' },
          { text: ');', tone: 'plain' },
        ],
        annotation: 'Filters eligible high-volume SKU lines with zero external network calls.',
      },
      {
        num: '04',
        tokens: [
          { text: '  if ', tone: 'kw' },
          { text: '(!b2bTier || targets.length === ', tone: 'plain' },
          { text: '0', tone: 'num' },
          { text: ') ', tone: 'plain' },
          { text: 'return ', tone: 'kw' },
          { text: 'EMPTY_DISCOUNT;', tone: 'type' },
        ],
        annotation: 'Fast early-exit guard keeps checkout P99 latency flat under flash traffic.',
      },
      {
        num: '05',
        tokens: [
          { text: '  return ', tone: 'kw' },
          { text: '{ discounts: [{ targets, value: { percentage: { value: ', tone: 'plain' },
          { text: '"15.0"', tone: 'str' },
          { text: ' } } }] };', tone: 'plain' },
        ],
        annotation: 'Returns deterministic discount payload applied atomically to checkout totals.',
      },
      {
        num: '06',
        tokens: [{ text: '}', tone: 'plain' }],
        annotation: 'Compiled binary verified for Shopify Plus Checkout Extensibility.',
      },
    ],
    executionSteps: [
      { step: 'Parse CartRunInput', latency: '0.4 ms', detail: 'Hydrate 14 line items & buyer metafield' },
      { step: 'Evaluate B2B Tier Rules', latency: '0.6 ms', detail: 'Matched tier WHOLESALE_GOLD (qty >= 5)' },
      { step: 'Emit Discount Operations', latency: '0.2 ms', detail: 'Applied 15.0% line-item allocation' },
    ],
    outputJson: [
      '{',
      '  "discountApplicationStrategy": "MAXIMUM",',
      '  "discounts": [{',
      '    "message": "Wholesale Tier Applied (15%)",',
      '    "targets": [{ "cartLine": { "id": "gid://shopify/CartLine/914" } }],',
      '    "value": { "percentage": { "value": "15.0" } }',
      '  }]',
      '}',
    ],
  },
  {
    id: 'magento-sync',
    filename: 'DeltaCatalogSync.php',
    stack: 'Magento 2 · PHP 8.3',
    title: 'Zero-Downtime Catalog Delta Queue',
    summary:
      'Asynchronous indexer and API sync pattern engineered for 100K+ SKU catalogs so bulk pricing or ERP stock updates never lock customer storefront queries.',
    lines: [
      {
        num: '01',
        tokens: [
          { text: 'final class ', tone: 'kw' },
          { text: 'DeltaCatalogSync ', tone: 'type' },
          { text: 'implements ', tone: 'kw' },
          { text: 'ConsumerInterface', tone: 'type' },
          { text: ' {', tone: 'plain' },
        ],
        annotation: 'Message queue worker isolated from storefront PHP-FPM request threads.',
      },
      {
        num: '02',
        tokens: [
          { text: '  public function ', tone: 'kw' },
          { text: 'processBatch', tone: 'fn' },
          { text: '(array $skuBatch): ', tone: 'plain' },
          { text: 'SyncResult', tone: 'type' },
          { text: ' {', tone: 'plain' },
        ],
        annotation: 'Processes chunked SKU payloads in deterministic 250-item transactions.',
      },
      {
        num: '03',
        tokens: [
          { text: '    $diff = $this->checksum->', tone: 'plain' },
          { text: 'changedRows', tone: 'fn' },
          { text: '($skuBatch);', tone: 'plain' },
        ],
        annotation: 'Skips unchanged catalog records via SHA-256 attribute hash comparison.',
      },
      {
        num: '04',
        tokens: [
          { text: '    $this->stockWriter->', tone: 'plain' },
          { text: 'upsertAtomic', tone: 'fn' },
          { text: '($diff);', tone: 'plain' },
        ],
        annotation: 'Performs non-blocking inventory & price upsert across multi-source warehouses.',
      },
      {
        num: '05',
        tokens: [
          { text: '    $this->cachePurger->', tone: 'plain' },
          { text: 'invalidateByTags', tone: 'fn' },
          { text: '($diff->', tone: 'plain' },
          { text: 'productIds', tone: 'fn' },
          { text: '());', tone: 'plain' },
        ],
        annotation: 'Targeted Varnish / Fastly surrogate-key purge for modified PDPs only.',
      },
      {
        num: '06',
        tokens: [
          { text: '    return new ', tone: 'kw' },
          { text: 'SyncResult', tone: 'type' },
          { text: '(count($diff), ', tone: 'plain' },
          { text: '"committed"', tone: 'str' },
          { text: ');', tone: 'plain' },
        ],
        annotation: 'Records structured audit metrics for zero-downtime cutover telemetry.',
      },
    ],
    executionSteps: [
      { step: 'Checksum Diff Filter', latency: '11 ms', detail: '250 SKUs scanned -> 18 modified rows' },
      { step: 'Atomic Multi-Source Upsert', latency: '19 ms', detail: 'Zero table lock on catalog_product_entity' },
      { step: 'Surrogate Cache Invalidation', latency: '4 ms', detail: 'Purged 18 Varnish product tags cleanly' },
    ],
    outputJson: [
      '{',
      '  "batchId": "delta_sync_8841",',
      '  "scannedSkus": 250,',
      '  "mutatedRows": 18,',
      '  "storefrontLockMs": 0,',
      '  "status": "committed"',
      '}',
    ],
  },
  {
    id: 'erp-webhook',
    filename: 'zohoInvoicePipeline.ts',
    stack: 'Node.js · TypeScript · Zoho Books',
    title: 'Idempotent ERP Webhook Relay',
    summary:
      'Production integration pattern powering our Zoho Books & accounting pipelines—verifies cryptographic signatures and prevents duplicate invoice creation on webhook retries.',
    lines: [
      {
        num: '01',
        tokens: [
          { text: 'export async function ', tone: 'kw' },
          { text: 'handleOrderPaid', tone: 'fn' },
          { text: '(req: ', tone: 'plain' },
          { text: 'WebhookRequest', tone: 'type' },
          { text: ') {', tone: 'plain' },
        ],
        annotation: 'Handles burst order webhooks from Shopify Plus & WooCommerce stores.',
      },
      {
        num: '02',
        tokens: [
          { text: '  if ', tone: 'kw' },
          { text: '(!verifyHmacSha256(req.rawBody, req.hmac)) ', tone: 'plain' },
          { text: 'throw ', tone: 'kw' },
          { text: 'new AuthError();', tone: 'type' },
        ],
        annotation: 'Timing-safe HMAC verification rejects forged or corrupted payloads.',
      },
      {
        num: '03',
        tokens: [
          { text: '  const ', tone: 'kw' },
          { text: 'locked ', tone: 'plain' },
          { text: '= await idempotency.', tone: 'plain' },
          { text: 'acquire', tone: 'fn' },
          { text: '(req.orderId);', tone: 'plain' },
        ],
        annotation: 'Distributed lock guarantees exactly-once Zoho invoice creation.',
      },
      {
        num: '04',
        tokens: [
          { text: '  const ', tone: 'kw' },
          { text: 'ledgerEntry ', tone: 'plain' },
          { text: '= mapTaxAndGst(req.order);', tone: 'plain' },
        ],
        annotation: 'Reconciles line-item taxes, shipping charges, and multi-currency rounding.',
      },
      {
        num: '05',
        tokens: [
          { text: '  return await ', tone: 'kw' },
          { text: 'zohoBooks.invoices.', tone: 'plain' },
          { text: 'createAndSync', tone: 'fn' },
          { text: '(ledgerEntry);', tone: 'plain' },
        ],
        annotation: 'Pushes verified invoice & customer ledger entry with automatic backoff.',
      },
      {
        num: '06',
        tokens: [{ text: '}', tone: 'plain' }],
        annotation: 'Logs clean reconciliation ID back to merchant order metafield.',
      },
    ],
    executionSteps: [
      { step: 'Verify HMAC-SHA256', latency: '0.8 ms', detail: 'Signature validated against merchant secret' },
      { step: 'Acquire Idempotency Key', latency: '2.1 ms', detail: 'Key ord_99284 locked (no duplicate)' },
      { step: 'Commit Zoho Books Invoice', latency: '42 ms', detail: 'Invoice #ZB-41082 synced & tagged' },
    ],
    outputJson: [
      '{',
      '  "orderId": "gid://shopify/Order/99284",',
      '  "zohoInvoiceNumber": "ZB-41082",',
      '  "taxReconciled": true,',
      '  "duplicateGuard": "passed",',
      '  "synced": true',
      '}',
    ],
  },
];

const TOKEN_COLORS: Record<NonNullable<CodeLine['tokens'][number]['tone']>, string> = {
  kw: 'text-[#60A5FA]',
  fn: 'text-[#93C5FD]',
  str: 'text-[#34D399]',
  type: 'text-[#FBBF24]',
  cm: 'text-[#6B7280]',
  num: 'text-[#F472B6]',
  plain: 'text-[#E5E7EB]',
};

export function CodeArchitectureLab() {
  const prefersReduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredLine, setHoveredLine] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [runStage, setRunStage] = useState<number>(3); // 3 = completed initial state

  const current = CODE_MODULES[activeIdx];

  useEffect(() => {
    setHoveredLine(0);
    setRunStage(3);
    setIsRunning(false);
  }, [activeIdx]);

  useEffect(() => {
    if (!isRunning) return;
    setRunStage(0);
    const t1 = window.setTimeout(() => setRunStage(1), 360);
    const t2 = window.setTimeout(() => setRunStage(2), 780);
    const t3 = window.setTimeout(() => {
      setRunStage(3);
      setIsRunning(false);
    }, 1220);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [isRunning]);

  const activeLine = current.lines[hoveredLine] ?? current.lines[0];

  return (
    <section className="bg-[#0B0C0E] text-white py-24 lg:py-32 border-b border-[#262930]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA]">
              <Terminal className="w-4 h-4" aria-hidden="true" />
              <span>Code Craft &amp; Runtime Workbench</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.12]">
              Clean, typed production code built for scale.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#A5AAB5] leading-relaxed">
              Inspect real architectural patterns our engineers deploy across Shopify Functions,
              Magento 2 indexers, and idempotent ERP webhook middleware. Hover any line or execute
              the trace.
            </p>
          </div>
        </Reveal>

        {/* Workbench Shell */}
        <div className="bg-[#14161A] border border-[#262930] rounded-2xl overflow-hidden">
          {/* Top Editor Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-[#262930] bg-[#0F1114]">
            <div
              role="tablist"
              aria-label="Engineering code patterns"
              className="flex flex-wrap items-center gap-1.5"
            >
              {CODE_MODULES.map((mod, idx) => {
                const selected = idx === activeIdx;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveIdx(idx)}
                    className="relative px-3.5 py-2 rounded-lg font-mono text-xs transition-colors whitespace-nowrap shrink-0"
                  >
                    {selected && (
                      <motion.span
                        layoutId="code-tab-active"
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-[#1D222B] border border-[#323A48] rounded-lg"
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        selected ? 'text-white' : 'text-[#8B919E] hover:text-white'
                      }`}
                    >
                      {mod.filename}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block font-mono text-[11px] text-[#8B919E]">
                {current.stack}
              </span>
              <button
                type="button"
                onClick={() => setIsRunning(true)}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#2563EB] disabled:opacity-70 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    <span>Tracing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Run Trace</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Split: Left Code Canvas + Right Live Execution & Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Code Panel */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#262930] p-5 sm:p-7 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-5">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {current.title}
                    </h3>
                    <p className="text-sm text-[#9EA3AE] mt-1 leading-relaxed">{current.summary}</p>
                  </div>

                  {/* Interactive Syntax Lines */}
                  <div className="rounded-xl bg-[#0B0C0E] border border-[#262930] py-3 px-2 sm:px-3 overflow-x-auto">
                    <div className="min-w-[460px] space-y-0.5 font-mono text-xs sm:text-[13px] leading-6">
                      {current.lines.map((line, lIdx) => {
                        const isLineActive = hoveredLine === lIdx;
                        const isTraced = isRunning && runStage === lIdx % 3;
                        return (
                          <div
                            key={line.num}
                            onMouseEnter={() => setHoveredLine(lIdx)}
                            onClick={() => setHoveredLine(lIdx)}
                            className={`relative flex items-center gap-4 px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                              isLineActive || isTraced
                                ? 'bg-[#1D4ED8]/18 text-white'
                                : 'hover:bg-white/[0.04]'
                            }`}
                          >
                            <span
                              className={`w-5 shrink-0 select-none tabular-nums text-right ${
                                isLineActive ? 'text-[#60A5FA]' : 'text-[#52555E]'
                              }`}
                            >
                              {line.num}
                            </span>
                            <code className="whitespace-pre">
                              {line.tokens.map((tok, tIdx) => (
                                <span
                                  key={tIdx}
                                  className={TOKEN_COLORS[tok.tone ?? 'plain']}
                                >
                                  {tok.text}
                                </span>
                              ))}
                            </code>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Line Inspector Callout */}
              <div className="mt-5 rounded-xl bg-[#0F1114] border border-[#262930] px-4 py-3 flex items-start gap-3">
                <Braces className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] text-[#60A5FA] uppercase tracking-wider">
                    Line {activeLine.num} Architecture Note
                  </div>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] mt-0.5 leading-relaxed">
                    {activeLine.annotation}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Execution Pipeline + Verified Output Payload */}
            <div className="lg:col-span-5 p-5 sm:p-7 bg-[#101216] flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9EA3AE]">
                    Execution Pipeline
                  </span>
                  <span className="font-mono text-[11px] text-[#34D399] tabular-nums">
                    {runStage >= 3 ? 'PASS · 0 ERRORS' : 'RUNNING'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {current.executionSteps.map((st, idx) => {
                    const completed = runStage > idx;
                    const active = runStage === idx && isRunning;
                    return (
                      <motion.div
                        key={st.step}
                        animate={
                          prefersReduced
                            ? undefined
                            : {
                                borderColor: active
                                  ? 'rgba(96, 165, 250, 0.7)'
                                  : completed
                                  ? 'rgba(52, 211, 153, 0.35)'
                                  : 'rgba(38, 41, 48, 1)',
                              }
                        }
                        className="rounded-xl border bg-[#14161A] px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                completed
                                  ? 'text-[#34D399]'
                                  : active
                                  ? 'text-[#60A5FA]'
                                  : 'text-[#52555E]'
                              }`}
                              aria-hidden="true"
                            />
                            <span className="text-xs sm:text-sm font-medium text-white">
                              {st.step}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-[#60A5FA] tabular-nums">
                            {st.latency}
                          </span>
                        </div>
                        <p className="text-xs text-[#9EA3AE] mt-1 pl-6">{st.detail}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Output JSON Console */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9EA3AE]">
                    Verified Runtime Output
                  </span>
                  <Link
                    to="/insights"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#60A5FA] hover:text-white transition-colors"
                  >
                    <span>Engineering Insights</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <AnimatePresence mode="wait">
                  <motion.pre
                    key={`${current.id}-${runStage >= 3 ? 'done' : 'wait'}`}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl bg-[#0B0C0E] border border-[#262930] p-4 font-mono text-xs leading-5 text-[#A5F3FC] overflow-x-auto"
                  >
                    {runStage >= 3
                      ? current.outputJson.join('\n')
                      : '// Executing deterministic trace...'}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
