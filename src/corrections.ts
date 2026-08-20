interface Rendition { id: string; artifactId: string; accessId: string; copyVersion: string; bytes: string; analysisCreditCost: 0; supersedes?: string; status: "current" | "superseded"; editorId?: string; approverId?: string }
export class RenditionCorrections {
  readonly #renditions = new Map<string, Rendition>(); #sequence = 0;
  publish(artifactId: string, accessId: string, copyVersion: string, bytes: string): Rendition { const rendition: Rendition = { id: `rendition_${++this.#sequence}`, artifactId, accessId, copyVersion, bytes, analysisCreditCost: 0, status: "current" }; this.#renditions.set(rendition.id, rendition); return structuredClone(rendition); }
  correct(id: string, copyVersion: string, bytes: string, editorId: string, approverId: string): Rendition {
    if (editorId === approverId) throw new Error("separation_of_duties"); const previous = this.#get(id); previous.status = "superseded";
    const corrected: Rendition = { id: `rendition_${++this.#sequence}`, artifactId: previous.artifactId, accessId: previous.accessId, copyVersion, bytes, analysisCreditCost: 0, supersedes: previous.id, status: "current", editorId, approverId }; this.#renditions.set(corrected.id, corrected); return structuredClone(corrected);
  }
  get(id: string): Rendition { return structuredClone(this.#get(id)); }
  #get(id: string): Rendition { const rendition = this.#renditions.get(id); if (!rendition) throw new Error("rendition_not_found"); return rendition; }
}
