import { Component, ChangeDetectionStrategy, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-join',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="join-screen">
      <div class="join-card">
        <img class="logo" src="/hofi-logo.svg" alt="Hofi" width="64" height="64" />

        @if (state() === 'redirect') {
          <div class="state-redirect">
            <div class="spinner"></div>
            <h2>Abriendo Hofi…</h2>
            <p>Si la app no se abre automáticamente, descárgala primero.</p>
          </div>
        }

        @if (state() === 'download') {
          <div class="state-download">
            <h2>Únete a Hofi</h2>
            <p>Para aceptar la invitación, descarga la app o ábrela si ya la tienes instalada.</p>

            <a class="store-btn android" [href]="playStoreUrl" target="_blank" rel="noopener">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M3.18 23.76c.33.18.7.2 1.06.04l12.02-6.93-2.54-2.54L3.18 23.76zm16.4-10.26L17.1 12l2.49-1.5L21.4 12l-1.82 1.5zM4.24.2C3.88.04 3.51.06 3.18.24L13.72 10.4 16.26 7.9 4.24.2zm9.48 12.34L3.18 22.76c.33.18.7.2 1.06.04l12.02-6.93-2.54-2.33z"
                />
              </svg>
              Descargar en Google Play
            </a>

            @if (token()) {
              <div class="manual-code">
                <span class="code-label">O ingresa este código manualmente en la app</span>
                <button class="code-copy" (click)="copyToken()">
                  {{ copied() ? '¡Copiado!' : token() }}
                </button>
              </div>
            }
          </div>
        }

        @if (state() === 'invalid') {
          <div class="state-invalid">
            <h2>Enlace inválido</h2>
            <p>
              Este enlace de invitación expiró o ya fue usado. Pide uno nuevo al admin del hogar.
            </p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .join-screen {
        min-height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0e1512;
        padding: 24px 16px;
      }
      .join-card {
        background: #1a2318;
        border-radius: 20px;
        padding: 40px 32px;
        max-width: 400px;
        width: 100%;
        text-align: center;
        color: #fff;
      }
      .logo {
        border-radius: 16px;
        margin-bottom: 28px;
      }
      h2 {
        margin: 0 0 10px;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
      p {
        margin: 0 0 28px;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.15);
        border-top-color: #4ade80;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 0 auto 24px;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .store-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 24px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        margin-bottom: 16px;
        transition: opacity 150ms;
        &:hover {
          opacity: 0.88;
        }
        &.android {
          background: #4ade80;
          color: #0e1512;
        }
      }
      .manual-code {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      .code-label {
        display: block;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .code-copy {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #fff;
        font-family: monospace;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.12em;
        padding: 12px 20px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 150ms;
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    `,
  ],
})
export class Join implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly state = signal<'redirect' | 'download' | 'invalid'>('redirect');
  readonly token = signal('');
  readonly copied = signal(false);

  readonly playStoreUrl = 'https://play.google.com/store/apps/details?id=io.cristiangonzalez.hofi';

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') ?? '';

    if (!token) {
      this.state.set('invalid');
      return;
    }

    this.token.set(token);
    this.state.set('redirect');

    // Try to open the app via custom scheme
    window.location.href = `hofi://join/${token}`;

    // If the user is still on this page after 2.5s, the app wasn't installed
    timer(2500).subscribe(() => {
      if (this.state() === 'redirect') this.state.set('download');
    });
  }

  async copyToken(): Promise<void> {
    await navigator.clipboard.writeText(this.token());
    this.copied.set(true);
    timer(2000).subscribe(() => this.copied.set(false));
  }
}
