import { Identifiable } from '@project-types/common';

export interface BaseFindOptions<I = string> {
    id?: I[];
}

export interface ICommand {
    execute(): Promise<void> | void;
}

export interface Entity<Id = unknown> extends Identifiable<Id> {}
