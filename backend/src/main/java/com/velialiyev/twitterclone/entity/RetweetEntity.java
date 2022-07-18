package com.velialiyev.twitterclone.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class RetweetEntity extends BaseSingleActionEntity {
}
