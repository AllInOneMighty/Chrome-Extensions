namespace common {
  export const enum ColorId {
    EMAIL_UNREAD = 'email-unread-color',
    EMAIL_READ = 'email-read-color'
  }

  export const DEFAULT_COLORS: Record<ColorId, string> = {
    [ColorId.EMAIL_UNREAD]: '#FFEB86',
    [ColorId.EMAIL_READ]: '#CDF39F'
  };
}  // namespace common