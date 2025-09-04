erDiagram
    users {
        UUID id PK
        string email
        string full_name
        timestamp created_at
        timestamp updated_at
    }

    roles {
        UUID id PK
        string name "Ex: 'admin', 'customer'"
    }

    user_roles {
        UUID user_id FK
        UUID role_id FK
    }

    products {
        UUID id PK
        string name
        string slug
        text description
        string logo_url
        jsonb page_config "Configuration de la page produit"
        timestamp created_at
        timestamp updated_at
    }

    product_media {
        UUID id PK
        UUID product_id FK
        string media_type "Ex: 'image', 'video'"
        string file_url
        integer display_order
        timestamp created_at
        timestamp updated_at
    }

    updates {
        UUID id PK
        UUID product_id FK
        string version_number
        text changelog
        string download_url
        boolean is_latest
        boolean is_public
        timestamp published_at
        timestamp created_at
        timestamp updated_at
    }
    
    edition_types {
        UUID id PK
        string name
        text description
        boolean requires_proof
        integer display_order
        boolean is_public
        timestamp created_at
        timestamp updated_at
    }

    licenses {
        UUID id PK
        UUID product_id FK
        UUID edition_type_id FK
        string name
        integer price_in_cents
        jsonb feature_config
        boolean is_public
        integer display_order
        timestamp created_at
        timestamp updated_at
    }

    customer_licenses {
        UUID id PK
        UUID user_id FK
        UUID license_id FK
        UUID order_id FK
        string license_key
        string status
        timestamp expires_at
        jsonb extra_config
        timestamp created_at
        timestamp updated_at
    }

    activations {
        UUID id PK
        UUID customer_license_id FK
        string machine_fingerprint
        timestamp activated_at
    }
    
    special_license_requests {
        UUID id PK
        UUID user_id FK
        UUID license_id FK
        string status "Ex: 'pending', 'approved', 'rejected'"
        text justification_text
        string proof_file_url
        timestamp created_at
        timestamp updated_at
    }

    orders {
        UUID id PK
        UUID user_id FK
        integer total_amount
        string currency
        string status
        jsonb payment_provider_details
        timestamp created_at
        timestamp updated_at
    }

    users ||--|{ user_roles : "has"
    roles ||--|{ user_roles : "is"
    users ||--o{ orders : "places"
    users ||--o{ customer_licenses : "owns"
    users ||--o{ special_license_requests : "submits"

    products ||--o{ updates : "has"
    products ||--o{ licenses : "has"
    products ||--o{ product_media : "has"

    edition_types ||--o{ licenses : "is of type"
    licenses ||--o{ customer_licenses : "is of type"
    licenses ||--o{ special_license_requests : "is for"

    orders ||--o{ customer_licenses : "contains"
    customer_licenses ||--o{ activations : "has"
}