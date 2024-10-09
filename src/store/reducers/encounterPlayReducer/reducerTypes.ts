interface AddEffectProgress {
  type: 'progress';
  anchor: string;
  name: string;
  duration: number;
}

interface AddEffectLasting {
  type: 'lasting';
  name: string;
}

export type AddEffectType = AddEffectProgress | AddEffectLasting;
