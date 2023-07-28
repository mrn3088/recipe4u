export const isError = (error: unknown): error is { code: string } => {
  return (error as { code: string }).code !== undefined;
};
