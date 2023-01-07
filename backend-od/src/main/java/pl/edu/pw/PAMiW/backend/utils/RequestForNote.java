package pl.edu.pw.PAMiW.backend.utils;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class RequestForNote {
    Long id;
    String keycloakId;
    String password;
}
